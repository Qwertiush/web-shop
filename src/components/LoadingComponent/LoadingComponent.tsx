import styles from './LoadingComponent.module.scss'

interface LoadingComponentProps{
    text: string
}

export const LoadingComponent: React.FC<LoadingComponentProps> = ({text}) =>{
  return (
    <div className={styles.loader}>
        <div className={styles.box}>
            <div className={styles.topSide}></div>
            <div className={styles.bottomSide}></div>

            <div className={styles.screen}>
                <div className={styles.lightrayLimit}>
                    <div className={styles.lighttray}></div>
                </div>
                <div className={styles.text}>{text}</div>
                <div className={styles.loaderBox}>
                    <div className={styles.progress}></div>
                </div>
            </div>
        </div>
    </div>
  );
}