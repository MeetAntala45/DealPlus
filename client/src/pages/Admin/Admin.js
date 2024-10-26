import { Tabs } from 'antd'
import React, { useEffect } from 'react'
import ProductsInfo from './ProductsInfo'
import Users from './Users'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'

const Admin = () => {
  const navigate =  useNavigate()
  const {user} = useSelector(state => state.users);

  useEffect(()=>{
      if(user.role!=='admin'){
        navigate('/')
      }
  },[]);
  
  return (
    <div>
        <Tabs>
           <Tabs.TabPane tab="Products" key="1">
            <ProductsInfo/>
           </Tabs.TabPane>
           <Tabs.TabPane tab="Users" key='2'>
               <Users/>
           </Tabs.TabPane>
        </Tabs>
    </div>
  )
}

export default Admin