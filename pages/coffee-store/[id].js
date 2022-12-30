import { useRouter } from "next/router";
import Link from "next/link";
import CoffeeStoreData from "../../data/coffee-stores.json";
import Head from "next/head";
import styles from "../../styles/coffee-store.module.css";
import Image from "next/image";
import classNames from "classnames";

export function getStaticPaths() {
    var paths = CoffeeStoreData.map(coffeeStore => {
        return {
            params: {
                id: coffeeStore.id.toString(),
            },
        }
    })
    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps(staticProps) {
    const params = staticProps.params;
    return {
        props: {
            coffeeStore: CoffeeStoreData.find(coffeeStore => {
                return coffeeStore.id.toString() === params.id;
            })
        },
    }
}

const CoffeeStore = (props) => {
    const router = useRouter();
    if (router.isFallback) {
        return <div><h1>Loading...</h1></div>
    }

    const { name, address, neighbourhood, imgUrl } = props.coffeeStore;

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
                            <button>Back to home { router.query.id }</button>
                        </Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    <Image alt={name} src={imgUrl} width={600} height={360}
                        className={styles.storeImg} />
                </div>
                <div className={classNames("glass", styles.col1)}>
                    <div className={styles.iconWrapper}>
                        <Image alt="" src="" width={24} height={24} />
                        <p className={styles.text}>{address}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image alt="" src="" width={24} height={24} />
                        <p className={styles.text}>{neighbourhood}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image alt="" src="" width={24} height={24} />
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