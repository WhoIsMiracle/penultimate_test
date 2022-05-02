import { Formik, Form, Field } from "formik"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPostsProfileSelector } from "../../../../../redux/selectors"
import styles from './profileDataPosts.module.scss'
import { actions } from "../../../../../redux/profile-reducer"

const ProfileDataPosts: React.FC = () => {
    let posts = useSelector(getPostsProfileSelector)
    const dispatch = useDispatch()

    return <div className={styles.profile__posts}>
        <Formik initialValues={{fieldPosts: ''}}
        onSubmit={(values: {fieldPosts: string}, { setSubmitting }) => {
            dispatch(actions.addMessage({post: values.fieldPosts}))
            values.fieldPosts = ''
            setSubmitting(false)
        }}>
        {({ isSubmitting }) => (
            <Form className={styles.profile__textarea}>
            <Field type="text" component='textarea' name="fieldPosts" />
            <button type="submit" disabled={isSubmitting}>
                Send
            </button>
            </Form>
        )}
        </Formik>
        <div className={styles.profile__posts}>
            <ul>
                {posts.map((post, index) => <li key={post.post + index}>{post.post}</li>)}
            </ul>
        </div>
    </div>
}

export default ProfileDataPosts