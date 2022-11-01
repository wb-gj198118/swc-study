import React from 'react';
import styles from './Home.module.css';
import WebpackLogo from '../svg/webpack-logo.svg';

const links = [
  { text: 'Webpack', href: 'https://webpack.docschina.org/configuration/' },
  { text: 'React', href: 'https://zh-hans.reactjs.org/' },
  { text: 'Windi CSS', href: 'https://windicss.org/guide/migration.html' }
];

export type IndexPageProps = {
  // indexPageProps
}

export const HomePage: React.FC<IndexPageProps> = () => {

  return (
    <>
      <div className={styles.module}>
        <WebpackLogo className="w-2/4 mb-4"/>
        <span className={styles.title}>Hello Webpack!</span>
        <div className="flex mt-4 gap-4">
          {links.map(({ text, href }, index) => (
            <a key={index} href={href} target="_blank" rel="noreferrer"
               className={styles.link}>{text}</a>
          ))}
        </div>
      </div>
      <div className="mt-3">
        <span className="font-light text-sm text-black text-opacity-75">{APP_NAME}@{APP_VERSION} in {APP_MODE}</span>
      </div>
    </>
  );
};
