import {TbFaceIdError} from 'react-icons/tb'

const Error = ({value,opration}) => {
  return (
    <div className='flex flex-col items-center justify-center'>
        <TbFaceIdError size={500}/>
        <h1 className='text-xl'style={{color:"#203A43", letterSpacing:"1px"}}>{`Sorry ${value} not Found`}</h1>
        <p style={{color:"#203A43", letterSpacing:"1px"}}>{`Please ${opration}`}</p>
    </div>
  )
}

export default Error