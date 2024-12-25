import { useRouter } from "next/router";

/**
 * A custom hook that provides the active route from the Next.js router.
 *
 * This hook utilizes the Next.js `useRouter` hook to access the current route
 * and extracts the first segment of the path after the root. This can be useful
 * for determining which navigation item should be highlighted based on the current
 * route.
 *
 * @returns {Object} An object containing the active route.
 * @returns {string} activeRoute - The first segment of the current route.
 */
export const useNavigation = () => {
    const router = useRouter();
    const activeRoute = router.route.split('/')[1];
    return { activeRoute };
}