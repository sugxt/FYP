import React from 'react'
import { useParams } from 'react-router-dom';

const UpdatePackage = () => {
    const { id } = useParams();

  return (
    <div>UpdatePackage</div>
  )
}

export default UpdatePackage