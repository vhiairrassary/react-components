/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useEffect, RefObject, useRef, useCallback } from 'react';

const inputTypesWhitelist: Record<string, boolean> = {
  text: true,
  search: true,
  url: true,
  tel: true,
  email: true,
  password: true,
  number: true,
  date: true,
  month: true,
  week: true,
  time: true,
  datetime: true,
  'datetime-local': true
};

/**
 * Helper function for legacy browsers and iframes which sometimes focus
 * elements like document, body, and non-interactive SVG.
 * @param {Element} el
 */
function isValidFocusTarget(el: Element | null) {
  if (
    el &&
    el.nodeName !== 'HTML' &&
    el.nodeName !== 'BODY' &&
    'classList' in el &&
    'contains' in el.classList
  ) {
    return true;
  }

  return false;
}

/**
 * Computes whether the given element should automatically trigger the
 * `focus-visible` class being added, i.e. whether it should always match
 * `:focus-visible` when focused.
 * @param {Element} el
 * @return {boolean}
 */
function focusTriggersKeyboardModality(el: HTMLElement) {
  const type = el.getAttribute('type') || 'unknown';
  const tagName = el.tagName;
  const readOnly = el.getAttribute('readOnly');

  if (tagName === 'INPUT' && inputTypesWhitelist[type] && !readOnly) {
    return true;
  }

  if (tagName === 'TEXTAREA' && !readOnly) {
    return true;
  }

  if (el.isContentEditable) {
    return true;
  }

  return false;
}

/**
 * Add the `focus-visible` class to the given element if it was not added by
 * the author.
 * @param {Element} el
 */
function addFocusVisibleClass(el: Element | null) {
  if (el && el.classList.contains('focus-visible')) {
    return;
  }

  el && el.classList.add('focus-visible');
}

/**
 * Remove the `focus-visible` class from the given element if it was not
 * originally added by the author.
 * @param {Element} el
 */
function removeFocusVisibleClass(el: HTMLElement) {
  if (!el.classList.contains('focus-visible')) {
    return;
  }
  el.classList.remove('focus-visible');
}

interface IFocusVisibleOptions {
  ref: RefObject<HTMLElement>;
  className?: string;
}

const useFocusVisible = ({ ref, className = 'focus-visible' }: IFocusVisibleOptions) => {
  const hadKeyboardEventRef = useRef(true);
  const hadFocusVisibleRecentlyRef = useRef(false);
  const hadFocusVisibleRecentlyTimeout = useRef<number>();

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.metaKey || e.altKey || e.ctrlKey) {
      return;
    }

    if (isValidFocusTarget(document.activeElement)) {
      addFocusVisibleClass(document.activeElement);
    }

    hadKeyboardEventRef.current = true;
  }, []);

  const onPointerDown = useCallback(() => {
    hadKeyboardEventRef.current = false;
  }, []);

  const onFocus = useCallback((e: FocusEvent) => {
    // Prevent IE from focusing the document or HTML element.
    if (!isValidFocusTarget(e.target as any)) {
      return;
    }
    debugger;
    if (hadKeyboardEventRef.current || focusTriggersKeyboardModality(e.target as any)) {
      addFocusVisibleClass(e.target as any);
    }
  }, []);

  const onBlur = useCallback((e: FocusEvent) => {
    debugger;
    if (!isValidFocusTarget(e.target as any)) {
      return;
    }

    if (
      (e.target as HTMLElement).classList.contains('focus-visible') ||
      (e.target as HTMLElement).hasAttribute('data-focus-visible-added')
    ) {
      // To detect a tab/window switch, we look for a blur event followed
      // rapidly by a visibility change.
      // If we don't see a visibility change within 100ms, it's probably a
      // regular focus change.
      hadFocusVisibleRecentlyRef.current = true;
      clearTimeout(hadFocusVisibleRecentlyTimeout.current);

      hadFocusVisibleRecentlyTimeout.current = window.setTimeout(() => {
        hadFocusVisibleRecentlyRef.current = false;
        clearTimeout(hadFocusVisibleRecentlyTimeout.current);
      }, 100);

      removeFocusVisibleClass(e.target as HTMLElement);
    }
  }, []);

  useEffect(() => {
    const copiedRef = ref.current;

    document.addEventListener('keydown', onKeyDown, true);
    document.addEventListener('mousedown', onPointerDown, true);
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('touchstart', onPointerDown, true);
    // ref.current.addEventListener('visibilitychange', onVisibilityChange, true);

    if (copiedRef) {
      copiedRef.addEventListener('focus', onFocus, true);
      copiedRef.addEventListener('blur', onBlur, true);
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      // ref.current.addEventListener('visibilitychange', onVisibilityChange, true);

      if (copiedRef) {
        copiedRef.removeEventListener('focus', onFocus, true);
        copiedRef.removeEventListener('blur', onBlur, true);
      }
    };
  }, [ref, onKeyDown, onPointerDown, onBlur, onFocus]);
};

export default useFocusVisible;
