import Image from "next/image";
import Link from "next/link";
import styles from "../styles/card.module.css";
import classNames from "classnames";

const Card = (props) => {
    return (
        <Link href={props.href} className={styles.cardLink}>
            <div className={classNames("glass", styles.container)}>
                <div className={styles.cardHeaderWrapper}>
                    <h2 className={styles.cardHeader}>{props.name}</h2>
                </div>
                <div className={styles.cardImageWrapper}>
                    <Image alt="coffee-store" src={props.imgUrl} width={260} height={160} className={styles.cardImage} />
                </div>
            </div>
        </Link>
    );
};

export default Card;