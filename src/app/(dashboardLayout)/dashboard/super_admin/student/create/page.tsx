// import React from 'react';
// import StudentForm from '../_components/StudentForm';


// import StudentForm from "../_components/StudentForm";

// const page = () => {
  //   return <StudentForm />
  // };
  
  // export default page;



import StudentForm from "../_components/StudentForm";

const page = ({ params }: { params: { id: string } }) => {
  return <StudentForm id={params.id} />
};
export default page;


// import React from 'react';
// import StudentForm from '../_components/StudentForm';

// const page = ({ params }: { params: { id?: string } }) => {
//   return <StudentForm id={params.id} />
// };

// export default page;