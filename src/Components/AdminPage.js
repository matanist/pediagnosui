import React,{useEffect} from 'react'
import { getValidateToken } from '../Actions/userActions';

export default function AdminPage() {
    useEffect(() => {
        var token = localStorage.getItem('token');
        var role = localStorage.getItem('role');
        getValidateToken({token:token}).then(data=>{
            if(data.data.code==200){
                if(data.data.set==role){
                    console.log('doğru');
                }
                else{
                    localStorage.setItem('role',data.data.set);
                    window.location.pathname='/signin';
                }
            }
            else{
                window.location.pathname='/signin';
            }
        })
       
    }, [])
    return (
        <div>
            Admin Sayfası
        </div>
    )
}
