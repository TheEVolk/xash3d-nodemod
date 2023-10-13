vcpkg_from_github(
    OUT_SOURCE_PATH SOURCE_PATH
    REPO FWGS/hlsdk-portable
    REF 17b34aa42b2060706deb20aa82df0ea2766e1b18
    SHA512 09be0ca21ec7beb3d169a8feac656a9d177eb91161bad817120a480a0cb3f659aeb653051c5b37c4d552cdd9a99d5e2556a9121d80039ae3ae9a48513a6176ac
    HEAD_REF master
    PATCHES
        add-archtypes-header.patch # add missing headers that used by Metamod
        add-sequence-header.patch
)

file(INSTALL "${SOURCE_PATH}/LICENSE" DESTINATION "${CURRENT_PACKAGES_DIR}/share/${PORT}" RENAME copyright)
#file(INSTALL "${SOURCE_PATH}/utils/vgui/include" DESTINATION "${CURRENT_PACKAGES_DIR}/include/${PORT}/utils/vgui/include")
file(INSTALL 
    "${SOURCE_PATH}/common" 
    "${SOURCE_PATH}/pm_shared"
    "${SOURCE_PATH}/engine"
    "${SOURCE_PATH}/game_shared"
    "${SOURCE_PATH}/public"
    "${SOURCE_PATH}/dlls"
    "${SOURCE_PATH}/cl_dll"
    DESTINATION "${CURRENT_PACKAGES_DIR}/include/${PORT}/"
    FILES_MATCHING PATTERN "*.h")

# remove empty & unused directories
file(REMOVE_RECURSE 
    "${CURRENT_PACKAGES_DIR}/include/${PORT}/cl_dll/hl")
