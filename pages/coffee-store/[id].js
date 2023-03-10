import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import styles from "../../styles/coffee-store.module.css";
import Image from "next/image";
import classNames from "classnames";
import fetchCoffeeStores from "../../lib/coffee-store";

export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStores();
    var paths = coffeeStores.map(coffeeStore => {
        return {
            params: {
                id: coffeeStore.fsq_id.toString(),
            },
        }
    })
    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps(staticProps) {
    const coffeeStores = await fetchCoffeeStores();
    const params = staticProps.params;
    return {
        props: {
            coffeeStore: coffeeStores.find(coffeeStore => {
                return coffeeStore.fsq_id.toString() === params.id;
            })
        },
    }
}

const CoffeeStore = (props) => {
    const router = useRouter();
    if (router.isFallback) {
        return <div><h1>Loading...</h1></div>
    }

    const { name, location, imgUrl } = props.coffeeStore;

    const HandleUpvoteButton = () => {
        console.log("up vote");
    };
    
    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href="/">
                            Back to home
                        </Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    <Image alt={name} src={imgUrl  || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"} width={500} height={500}
                        className={styles.storeImg} />
                </div>
                <div className={classNames("glass", styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image alt="" src="/static/icons/place.svg" width={24} height={24} />
                        <p className={styles.text}>{location.address}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image alt="" src="/static/icons/nearMe.svg" width={24} height={24} />
                        <p className={styles.text}>{location.locality}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image alt="" src="/static/icons/star.svg" width={24} height={24} />
                        <p className={styles.text}>1</p>
                    </div>

                    <button className={styles.upvoteButton} onClick={HandleUpvoteButton}>
                        Up vote!
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CoffeeStore;