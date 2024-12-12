import {
    EffectCallback,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
} from "react";

export function useLatest<Value>(value: Value) {
    const valueRef = useRef(value);

    useLayoutEffect(() => {
        valueRef.current = value;
    });

    return valueRef;
}

export function usePrevious<T>(value: T) {
    const prevValue = useRef<T | null>(null);

    useEffect(() => {
        prevValue.current = value;
    }, [value]);

    return prevValue;
}

export function useEvent<T extends Function>(fn: T) {
    const fnRef = useRef(fn);

    useEffect(() => {
        fnRef.current = fn;
    }, [fn]);

    const eventCb = useCallback(
        (...args: unknown[]) => {
            return fnRef.current.apply(null, args);
        },
        [fnRef]
    );

    return eventCb as unknown as T;
}

/**
 * @name useMount
 * @description - Hook that executes a callback when the component mounts
 * @category Lifecycle
 *
 * @param {EffectCallback} effect The callback to execute
 *
 * @example
 * useMount(() => console.log('This effect runs on the initial render'));
 */
export const useMount = (effect: EffectCallback) => useEffect(effect, []);

/**
 * @name useDidUpdate
 * @description – Hook that behaves like useEffect, but skips the effect on the initial render
 *
 * @param {React.EffectCallback} effect The effect callback
 * @param {React.DependencyList} [deps] The dependencies list for the effect
 *
 * @example
 * useDidUpdate(() => {
 *   console.log('Won't be called when mounted');
 * }, [deps]);
 */
export const useDidUpdate = (
    effect: React.EffectCallback,
    deps?: React.DependencyList
) => {
    const initialRender = useRef(true);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        const effectReturns = effect();
        if (effectReturns && typeof effectReturns === "function") {
            return effectReturns;
        }
    }, deps);
};

/**
 * @name useLogger
 * @description - Hook for debugging lifecycle
 *
 * @param {string} name The name or identifier for the logger
 * @param {unknown[]} params Additional arguments to be logged
 *
 * @example
 * useLogger('Component', [1, 2, 3]);
 */
export const useLogger = (name: string, params: unknown[]) => {
    useEffect(() => {
        console.log(`${name} mounted`, ...params);
        return () => console.log(`${name} unmounted`);
    }, []);

    useDidUpdate(() => {
        console.log(`${name} updated`, ...params);
    }, params);
};
