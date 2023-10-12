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

add_library(${PROJECT_NAME} SHARED
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

if(MSVC)
	target_compile_definitions(${PROJECT_NAME} PRIVATE
		_CRT_SECURE_NO_WARNINGS=1 # disable CRT warnings
	)
else()
endif()

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
