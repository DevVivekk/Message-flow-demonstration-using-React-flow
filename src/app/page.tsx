import React from 'react'
import styles from './page.module.css'
const Page = () => {
  return (
    <div className={styles['main-page']}>
      <h2>Vist /react-flow, for the message flow demonstration using React flow, Typescript and  built using Next.js</h2>
      <ul>
      <li>You can add, edit and save the nodes</li>
      <li>Just tap on any specifc node to edit.</li>
      <li>When nodes are created they are allocated any random x and y position.</li>
      </ul>
    </div>
  )
}

export default Page