import React from 'react'
import { useParams } from 'react-router-dom';


const IndividualPackage = () => {
    const { id } = useParams();

  return (
    <div>individualPackage</div>
  )
}

export default IndividualPackage