import styles from "../assets/css/Card.module.css";

export function Card(props) {

    const { Image, Titulo } = props;

    return (

        <div className={styles.card}>
            <div className={styles.header}>
                <img src={Image} alt="" srcset="" />
            </div>
            <div className={styles.body}>
                <h6>{Titulo}</h6>
            </div>
        </div>

    );

}