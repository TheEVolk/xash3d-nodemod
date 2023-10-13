vcpkg_from_github(
    OUT_SOURCE_PATH SOURCE_PATH
    REPO alliedmodders/metamod-hl1
    REF 18a10db686702e8ae9e0fcb5b5febf8881dc9c2d
    SHA512 a16d78cf8dcd41d6aaa7e006ba4078544c6b034f7843c3052706f96d75fe83a914b2692a014071e797c6abafc8d5361492e20a713a55708d6c835d4a0622344a
    HEAD_REF master
    PATCHES
        add-missing-include.patch
)

file(INSTALL "${SOURCE_PATH}/GPL.txt" DESTINATION "${CURRENT_PACKAGES_DIR}/share/${PORT}" RENAME copyright)
file(INSTALL 
    "${SOURCE_PATH}/metamod" 
    DESTINATION "${CURRENT_PACKAGES_DIR}/include/${PORT}/"
    FILES_MATCHING PATTERN "*.h")

# remove empty & unused directories
file(REMOVE_RECURSE 
    "${CURRENT_PACKAGES_DIR}/include/${PORT}/metamod/ents" 
    "${CURRENT_PACKAGES_DIR}/include/${PORT}/metamod/msvc")
