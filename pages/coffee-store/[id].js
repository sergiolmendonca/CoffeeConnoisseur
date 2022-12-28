import { useRouter } from "next/router";
import Link from "next/link";
import CoffeeStoreData from "../../data/coffee-stores.json"

export function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    }
}

export async function getStaticProps(staticProps) {
    const params = staticProps.params;
    return {
        props: {
            coffeeStore: CoffeeStoreData.find(coffeeStore => {
                return coffeeStore.id === params.id;
            })
        },
    }
}

const CoffeeStore = (props) => {
    console.log(props.CoffeeStore)
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