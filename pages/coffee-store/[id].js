import { useRouter } from "next/router";
import Link from "next/link";

const CoffeeStore = () => {
    const router = useRouter();
    return (
        <>
            teste
            <Link href="http://google.com">
                <button>Back to home { router.query.id }</button>
            </Link>
        </>
    )
}

export default CoffeeStore;