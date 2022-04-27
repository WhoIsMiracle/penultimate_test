import { Field, Form, Formik } from "formik"
import cls from './users.module.css'
import { filterType, getUsersTC } from "../../redux/users-reducer"
import { useDispatch } from "react-redux"


type usersFilterProps = {
    filter: filterType
    currentPage: number
    pageSize: number
} 

const UsersFilter: React.FC<usersFilterProps> = ({filter, currentPage, pageSize, ...props}) => {
    let dispatch = useDispatch()
    return <div className={cls.users__filter}>
        <Formik enableReinitialize={true}
                initialValues={{term: filter.term, friend: filter.friend === null ? 'null' : filter.friend}}
                onSubmit={(filter, { setSubmitting }) => {
                    dispatch(getUsersTC(1, pageSize, filter))
                    setSubmitting(false)
                    }
                }>
        {({isSubmitting}) => (
            <Form>
                <Field name='term' component='input'
                type='text' placeholder='Enter your term'/>
                <Field name='friend' component='select'>
                    <option value='null'>All</option>
                    <option value='true'>Followed</option>
                    <option value='false'>Unfollowed</option>
                </Field>
                <button type="submit" disabled={isSubmitting}>Find</button>
            </Form>
        )}
        </Formik>
    </div>
}

export default UsersFilter;