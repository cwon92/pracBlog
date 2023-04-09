
import { useState } from 'react';
import './App.css';


function Modal(props) {
  
  return(
    <div className='modal'>
        <h4>{props.title[props.modalTitle]}</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <button onClick={props.changeTitle}>제목 수정</button>
      </div>
  )
}


function App() {

  let [title, setTitle] = useState(['첫 번째', '두 번째', '세 번째'])
  let [thumb, setThumb] = useState([0, 0, 0]);
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState(0);
  const [input, setInput] = useState("");
  const [inputArr, setInputArr] = useState([]);



  const changeTitle = () => {
    let copy = [...title];
    copy[0] = '새로운 첫 번째'
    setTitle(copy)
  }

  const sortArr = () => {
    let newArr = [...title];
    newArr = newArr.sort();
    setTitle(newArr);
  }

  function showModal() {
    setModal((prev) => !prev)
  }

  const showInput = (e) => {
    setInput(e.target.value)
  }

  const submitInput = (e) => {
    e.preventDefault();
    setTitle([input, ...title]);
    setThumb([0, ...thumb])
    console.log(thumb)
  }

  const deleteList = (index) => {
    setTitle(title.filter( (item, i) => i !== index ))
  }

  return (
    <div>
      <div className='black-nav'>
        <h4>블로그</h4>
      </div>

      <button onClick={sortArr}>가나다순으로 정렬</button>

      <button onClick={changeTitle}>글수정</button>

      <form onSubmit={submitInput}>
      <input type='text' onChange={showInput}/>
      <input type='submit' />
      </form>

      {
        title.map( (item, i) => {
          return (
            <div className='list' key={i}>
              <h4 onClick={ () => {showModal(); setModalTitle(i)}}>{title[i]} 
              <span onClick={ (e) => {
                e.stopPropagation();
                let thumbCopy = [...thumb];
                thumbCopy[i] = thumbCopy[i] + 1;
                setThumb(thumbCopy)
              }}> 👍</span> { thumb[i] }
              </h4>
              <p>2월 17일 발행</p>
              <button onClick={ () => {deleteList(i)} }>삭제</button>
            </div>
          )
        })
      }
      
      
      
      {modal ? <Modal title={title} changeTitle={changeTitle} modalTitle={modalTitle}/> : null }
      
    </div>
  );
}

export default App;
