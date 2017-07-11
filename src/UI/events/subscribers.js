import { on } from 'pub-sub-es6';
import * as types from './types';

/**
 * Event subscribers used as component method decorators
 *
 * @onAppReady
 * onAppReady(eventArgs) { ... }
 */

// Note: Subscribers must use `function` not `=>` because of scope binding

export const onAppReady = function () {
    on(types.APP_READY).apply(null, arguments);
}

export const onContentViewToggle = function () {
    on(types.TOGGLE_CONTENT_VIEW).apply(null, arguments);
}

export const onSettingsToggle = function () {
    on(types.TOGGLE_SETTINGS).apply(null, arguments);
}

export const onMediaReelOpen = function () {
    on(types.OPEN_MEDIA_REEL).apply(null, arguments);
}

export const onThreadOpen = function () {
    on(types.THREAD_OPEN).apply(null, arguments);
}

export const onThreadClose = function () {
    on(types.THREAD_CLOSE).apply(null, arguments);
}

export const onSubHeaderToggle = function () {
    on(types.SUB_HEADER_TOGGLE).apply(null, arguments);
}

export const onBoardReset = function () {
    on(types.RESET_BOARD).apply(null, arguments);
}