cmake_minimum_required(VERSION 3.18)
project(nodemod)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
SET(CMAKE_CXX_FLAGS "-Wfatal-errors -std=c++14 -m32 -Wno-return-type -fpermissive")
add_link_options(
		"-static-libgcc"
		"-static-libstdc++"
	)
add_compile_definitions(linux)


set(HLSDK_PATH ${CMAKE_CURRENT_SOURCE_DIR}/deps/hlsdk)
set(METAMOD_PATH ${CMAKE_CURRENT_SOURCE_DIR}/deps/metamod)

# HlSdk
include_directories( ${HLSDK_PATH}/common )
include_directories( ${HLSDK_PATH}/dlls )
include_directories( ${HLSDK_PATH}/engine )
include_directories( ${HLSDK_PATH}/game_shared )
include_directories( ${HLSDK_PATH}/pm_shared )
include_directories( ${HLSDK_PATH}/public )

# Metamod
include_directories( ${METAMOD_PATH} )

# NodeJS
if(WIN32)
	set(NODE_FILE "libnode.dll")
    set(SYS_PATH win32)
else()
	set(NODE_FILE "libnode.so.93")
    set(SYS_PATH linux)
endif()

add_definitions(-DBUILDING_NODE_EXTENSION=1 -DEXTERNAL_NAPI=1)

set(NODEJS_PATH "${PROJECT_SOURCE_DIR}/deps/node/lib/Release/${SYS_PATH}")
include_directories(
    ${PROJECT_SOURCE_DIR}/deps/node/include
	${PROJECT_SOURCE_DIR}/deps/v8
    ${PROJECT_SOURCE_DIR}/deps/uv
)

link_directories(${NODEJS_PATH})

# Engine source files
include_directories( src/ )

# The project sources
set( SRC_PATH ${CMAKE_CURRENT_SOURCE_DIR}/src )
set( S_SOURCES
    ${SRC_PATH}/lib/dllapi.cpp
    ${SRC_PATH}/lib/engine_api.cpp
    ${SRC_PATH}/lib/h_export.cpp
    ${SRC_PATH}/lib/meta_api.cpp
    ${SRC_PATH}/lib/public.cpp

    ${SRC_PATH}/node/nodeimpl.cpp
    ${SRC_PATH}/node/uvloop.cpp
    ${SRC_PATH}/node/resource.cpp
    ${SRC_PATH}/node/events.cpp

    ${SRC_PATH}/bindings/functions.cpp
    ${SRC_PATH}/bindings/bindings.cpp
    ${SRC_PATH}/bindings/players.cpp

    ${SRC_PATH}/common/logger.cpp

    ${SRC_PATH}/auto/dll_events.cpp
    ${SRC_PATH}/auto/dll_functions.cpp
    ${SRC_PATH}/auto/engine_events.cpp
    ${SRC_PATH}/auto/engine_functions.cpp

    ${SRC_PATH}/structures/entity.cpp
)

add_library(nodemod SHARED ${S_SOURCES})
target_link_libraries(nodemod 
    dl 
    pthread 
    uv 
    ${NODEJS_PATH}/libnode.so.93
)
#add_executable(nodemod2 ${S_SOURCES})
#target_link_libraries(nodemod2 dl pthread uv ${NODEJS_PATH}/libnode.so.93)
