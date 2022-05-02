import React from "react";
import cls from './profileData.module.scss';
import { Formik, Field, Form } from "formik";
import { updateProfileDataTC } from "../../../../redux/profile-reducer"; 
import { useDispatch, useSelector } from "react-redux";
import { profileType } from "../../../../types/types";
import { getAuthIdSelector } from "../../../../redux/selectors";

type propsType = {
    profile: profileType
    showContacts: boolean
    setEditMode: (editMode: boolean) => void
    setShowContacts: () => void
}

const ProfileDataForms: React.FC<propsType> = ({profile, setEditMode, showContacts, setShowContacts}) => {
    let authId = useSelector(getAuthIdSelector) as number
    let dispatch = useDispatch()
    let profileContactForms = Object.keys(profile.contacts).map(value => {
        return <div className={cls.contacts__forms} key={'contact' + value}>
            <div className={cls.forms__key}>
                <span><b>{value}:</b></span>
            </div>
            <div className={cls.forms__value}>
                <Field className={cls.contacts__item} name={'contacts.' + value} type='text' 
                placeholder={`Enter your ${value}`}/>
            </div>
        </div>
    })
    return <div className={cls.data__forms}>
            <Formik initialValues={profile} onSubmit={(data: profileType) => {
                dispatch(updateProfileDataTC(data, authId))
                setEditMode(false)}}>
                {({ isSubmitting }) => (
                    <Form>
                        <div className={cls.contact__itemWrap}>
                            <div className={cls.contact__itemText}><span><b>lookingJob:</b></span></div>
                            <Field className={cls.contact_item} name='lookingForAJob' type='text' placeholder='lookingForAJob'/>
                        </div>
                        <div className={cls.contact__itemWrap}>
                            <div className={cls.contact__itemText}><span><b>lookingJobDesc:</b></span></div>
                            <Field className={cls.contact_item} name='lookingForAJobDescription' type='text' placeholder='lookingForAJobDescription'/>
                        </div>
                        <div className={cls.contact__itemWrap}>
                            <div className={cls.contact__itemText}><span><b>fullName:</b></span></div>
                            <Field className={cls.contact_item} name='fullName' type='text' placeholder='fullName'/>
                        </div>
                        <div className={cls.show__contacts} onClick={() => {setShowContacts()}}>
                            {showContacts ? <span>Hide contacts</span> : <span>Show contacts</span>}
                        </div>
                        <div className={showContacts ? cls.contact__formsShow : cls.contact__formsHidden}>
                            {profileContactForms}
                        </div>
                        <button type="submit" disabled={isSubmitting}>Save</button>
                    </Form>
                )}
                </Formik>
        </div>
}

export default ProfileDataForms;