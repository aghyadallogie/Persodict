import { useEffect, useState } from 'react';

/**
 * Custom hook that implements infinite scrolling over a list.
 *
 * It exposes a slice size (`visibleCount`) that grows by `step` items whenever
 * the user scrolls near the bottom of the page, keeping the number of rendered
 * nodes low for large lists to improve performance.
 *
 * Rather than an IntersectionObserver (whose crossing state can be left stale by
 * layout/animation changes and stop firing), this reads the actual scroll
 * position on every scroll/resize event and re-checks after each load. That can
 * never get "stuck", and it can't cascade: at the top of a long list the page is
 * provably not near the bottom, so nothing loads until the user scrolls.
 *
 * @param {number} total - The total number of available items.
 * @param {number} [step=8] - How many items to reveal per scroll.
 * @param {number} [threshold=300] - Distance from the bottom (px) that triggers a load.
 * @returns {Object} An object containing the current visible count.
 * @returns {number} visibleCount - The number of items currently revealed.
 */
export const useInfiniteScroll = (total: number, step = 8, threshold = 300) => {
    const [visibleCount, setVisibleCount] = useState(step);

    useEffect(() => {
        if (visibleCount >= total) return;

        let ticking = false;

        const check = () => {
            ticking = false;
            const scrolled = window.innerHeight + window.scrollY;
            const nearBottom = scrolled >= document.documentElement.scrollHeight - threshold;
            if (nearBottom) {
                setVisibleCount((current) => Math.min(current + step, total));
            }
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(check);
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        // Run once so a list that already fits within the viewport keeps filling
        // (and so we re-check immediately after each load).
        check();

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [visibleCount, total, step, threshold]);

    return { visibleCount };
};
