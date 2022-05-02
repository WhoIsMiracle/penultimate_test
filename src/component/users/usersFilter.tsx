import { Field, Form, Formik } from "formik"
import cls from './users.module.scss'
import { filterType, getUsersTC } from "../../redux/users-reducer"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentPageSelector, getFilterSelector, getPageSizeSelector } from "../../redux/selectors"




const UsersFilter: React.FC = () => {
    let filter = useSelector(getFilterSelector)
    let currentPage = useSelector(getCurrentPageSelector)
    let pageSize = useSelector(getPageSizeSelector)
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
                <Field className={cls.users__searchText} name='term' component='input'
                type='text' placeholder='Search 👁️'/>
                <Field className={cls.users__searchSelect} name='friend' component='select'>
                    <option value='null'>All</option>
                    <option value='true'>Followed</option>
                    <option value='false'>Unfollowed</option>
                </Field>
                <button className={cls.users__searchButton} type="submit" disabled={isSubmitting}>Find</button>
            </Form>
        )}
        </Formik>
    </div>
}

export default UsersFilter;