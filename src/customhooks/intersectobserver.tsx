import { useEffect, useRef, useState } from 'react';

interface IIntersectionObserver {
    root?: Element | null;
    rootMargin?: string;
    threshold: number | number[];
}

export default (
    { root = null, rootMargin, threshold = 0 }: IIntersectionObserver,
    onIntersect: (isIntersecting: boolean) => void
) => {
    const [entry, updateEntry] = useState<IntersectionObserverEntry>(
        {} as IntersectionObserverEntry
    );

    const [node, setNode] = useState<Element | null>(null);
    const observer = useRef<any>(null);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new window.IntersectionObserver(([entry]) => updateEntry(entry), {
            root,
            rootMargin,
            threshold
        });

        const { current: currentObserver } = observer;

        if (node) {
            currentObserver.observe(node);
            if (entry.isIntersecting) {
                onIntersect(entry.isIntersecting);
                currentObserver.unobserve(node);
            }
        }

        return () => currentObserver.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [node, root, rootMargin, threshold, entry.isIntersecting]);

    return [setNode, entry];
};
