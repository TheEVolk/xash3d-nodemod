cmake_minimum_required(VERSION 3.21)

set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} "${CMAKE_SOURCE_DIR}/cmake/")
if(POLICY CMP0069)
    cmake_policy(SET CMP0069 NEW)
endif()

if(POLICY CMP0063)
    cmake_policy(SET CMP0063 NEW)
endif()

if(POLICY CMP0091)
    cmake_policy(SET CMP0091 NEW)
endif()

if(NOT DEFINED CMAKE_POSITION_INDEPENDENT_CODE)
    SET(CMAKE_POSITION_INDEPENDENT_CODE ON)
endif()

include(VcpkgIntegration)
project(nodemod)
include(CompilerRuntime)


list(APPEND SOURCES_LIST
	"src/lib/dllapi.cpp"
	"src/lib/engine_api.cpp"
	"src/lib/h_export.cpp"
	"src/lib/meta_api.cpp"
	"src/lib/public.cpp"
	"src/node/nodeimpl.cpp"
	"src/node/uvloop.cpp"
	"src/node/resource.cpp"
	"src/node/events.cpp"
	"src/bindings/functions.cpp"
	"src/bindings/bindings.cpp"
	"src/bindings/players.cpp"
	"src/common/logger.cpp"
	"src/auto/dll_events.cpp"
	"src/auto/dll_functions.cpp"
	"src/auto/engine_events.cpp"
	"src/auto/engine_functions.cpp"
	"src/structures/entity.cpp"
)

# required for proper plugin loading from metamod, don't touch
if(WIN32)
	list(APPEND SOURCES_LIST "src/nodemod.def")
endif()

add_library(${PROJECT_NAME} SHARED ${SOURCES_LIST})

find_path(HLSDK_DIRECTORY "cl_dll/GameStudioModelRenderer.h" PATH_SUFFIXES "hlsdk")
find_path(METAMOD_DIRECTORY "metamod/api_info.h" PATH_SUFFIXES "metamod")

target_include_directories(${PROJECT_NAME} PRIVATE
	"${HLSDK_DIRECTORY}/common"
	"${HLSDK_DIRECTORY}/dlls"
	"${HLSDK_DIRECTORY}/engine"
	"${HLSDK_DIRECTORY}/game_shared"
	"${HLSDK_DIRECTORY}/pm_shared"
	"${HLSDK_DIRECTORY}/public"
	"${METAMOD_DIRECTORY}/metamod"
	"src"
	"deps/node/include"
	"deps/v8"
    "deps/uv"
)

set_target_properties(${PROJECT_NAME} PROPERTIES 
	OUTPUT_NAME "nodemod"
	CXX_STANDARD 17
	CXX_STANDARD_REQUIRED YES
	CXX_EXTENSIONS NO
)

# compiler options
if(WIN32)
	target_link_options(${PROJECT_NAME} PRIVATE /SUBSYSTEM:CONSOLE)
	target_compile_definitions(${PROJECT_NAME} PRIVATE
		_CRT_SECURE_NO_WARNINGS=1 # disable CRT warnings
	)
else()
	target_compile_options(${PROJECT_NAME} PRIVATE -Wfatal-errors)
	target_compile_options(${PROJECT_NAME} PRIVATE -fpermissive)

	# these will break compatibility with other architectures
	# but for now it's required for our purposes
	target_compile_options(${PROJECT_NAME} PRIVATE -m32)
	target_link_options(${PROJECT_NAME} PRIVATE -m32)
endif()

# link dependency libraries
# apply hacky workaround to bypass wrong CMAKE_SIZEOF_VOID_P value
set(BACKUP_CMAKE_SIZEOF_VOID_P "${CMAKE_SIZEOF_VOID_P}")
set(CMAKE_SIZEOF_VOID_P "")

find_package(fmt CONFIG REQUIRED)
target_link_libraries(${PROJECT_NAME} PRIVATE fmt::fmt)

set(CMAKE_SIZEOF_VOID_P "${BACKUP_CMAKE_SIZEOF_VOID_P}")

# link platform-specific libraries
if(NOT WIN32)
	target_link_libraries(${PROJECT_NAME} PRIVATE dl pthread)
endif()

# link Node.js library (in future this should be entirely handled by vcpkg)
if(WIN32)
	target_link_libraries(${PROJECT_NAME} PRIVATE "${CMAKE_CURRENT_SOURCE_DIR}/deps/node/lib/Release/win32/libnode.lib")
else()
	target_link_libraries(${PROJECT_NAME} PRIVATE "${CMAKE_CURRENT_SOURCE_DIR}/deps/node/lib/Release/linux/libnode.so.93")
endif()

# enable static runtime linking
set_compiler_runtime(${PROJECT_NAME} STATIC)

# set build output directory
set(DIR_COMMON_OUTPUT 
	${CMAKE_BINARY_DIR}/$<CONFIG>/bin
)

set_target_properties(${PROJECT_NAME} PROPERTIES 
	ARCHIVE_OUTPUT_DIRECTORY ${DIR_COMMON_OUTPUT}
	LIBRARY_OUTPUT_DIRECTORY ${DIR_COMMON_OUTPUT}
	RUNTIME_OUTPUT_DIRECTORY ${DIR_COMMON_OUTPUT}
)

install(TARGETS ${PROJECT_NAME}
	DESTINATION "${CMAKE_INSTALL_PREFIX}"
	PERMISSIONS 
        OWNER_READ OWNER_WRITE OWNER_EXECUTE
	    GROUP_READ GROUP_EXECUTE
	    WORLD_READ WORLD_EXECUTE 
)
