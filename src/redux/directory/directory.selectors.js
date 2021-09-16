import { createSelector } from "reselect";


const selectDirectoryState = state => state.directory;

export const selectDirectorySections = createSelector(
    [selectDirectoryState],
    directory => directory.sections
);