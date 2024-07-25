import { useRouter } from "next/router";

export const useNavigation = () => {
    const router = useRouter();
    const activeRoute = router.route.split('/')[1];
    return { activeRoute };
}