import { useState,useEffect,useRef } from 'react'
import { UseLocalStorage } from './components/localStorage';
import './App.scss'

  interface Book {
    name: string;
    author: string;
    year: string;
  }
  
  function App() {
    const { setItem, getItem } = UseLocalStorage("sadque");
    const [list, setList] = useState<Book[]>([]);
    const [inputValue, setInput] = useState<Book>({ name: 'Akidatul_Tawhid', author: 'Alfauzan', year: '2000' });
    const [searchQuery, setSearchQuery] = useState<string>('');
  
    const nameRef = useRef<HTMLInputElement>(null);
    const authorRef = useRef<HTMLInputElement>(null);
    const yearRef = useRef<HTMLInputElement>(null);
  
    useEffect(() => {
      const storedList = getItem();
      if (storedList.length > 0) {
        setList(storedList);
      }
    }, []);
  
    useEffect(() => {
      setItem(list);
    }, [list]);
  
    const addItem = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const nameValue = nameRef.current?.value.trim() || '';
      const authorValue = authorRef.current?.value.trim() || '';
      const yearValue = yearRef.current?.value.trim() || '';
      if (nameValue === '' || authorValue === '' || yearValue === '') return;
  
      const newBook: Book = { name: nameValue, author: authorValue, year: yearValue };
      setList([...list, newBook]);
      setInput({ name: '', author: '', year: '' });
      if (nameRef.current) nameRef.current.value = '';
      if (authorRef.current) authorRef.current.value = '';
      if (yearRef.current) yearRef.current.value = '';
    };
  
    const deleteItemFromList = (index: number) => {
      setList(list.filter((_, i) => i !== index));
    };
  
    const filteredList = list.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.year.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  return (
    <div className='mainDiv'>
      <div className='head'>
        <div className='header'>
          <h1>Online Salafiyu Maktaba</h1>
        </div>
        <div className='formm'>
          <form className='formm' onSubmit={addItem}>
            <input
              ref={nameRef}
              type="text"
              className='form'
              placeholder='Name'
              value={inputValue.name}
              onChange={(e) => setInput({ ...inputValue, name: e.target.value })}
            />
            <input
              ref={authorRef}
              type="text"
              className='form'
              placeholder='Author'
              value={inputValue.author}
              onChange={(e) => setInput({ ...inputValue, author: e.target.value })}
            />
            <input
              ref={yearRef}
              type="text"
              className='form'
              placeholder='Year'
              value={inputValue.year}
              onChange={(e) => setInput({ ...inputValue, year: e.target.value })}
            />
            <button className='btn' type="submit">Submit</button>
          </form>
          <input
            type="text"
            className='form'
            placeholder='Search For Book'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className='InputList'>
        <div>
          <ul className='list'>
            {filteredList.map((item, index) => (
              <li key={index}>
                <div>
                  <span>Name: {item.name}</span>
                  <span>Author: {item.author}</span>
                  <span>Year: {item.year}</span>
                </div>
                <button onClick={() => deleteItemFromList(index)} className='del'>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
