import React, { useState, useEffect } from 'react';
import { Menu, Input, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCoinsThunk,
  selectCoins
} from './redux/slices/coinsSlice';
import { Counter } from './components/counter/Counter';
import CoinList from './components/CoinList';
import 'antd/dist/antd.css'
import styles from './App.module.scss';

const { Option } = Select

function App() {
  const [current, setCurrent] = useState('all')
  const [coins, setCoins] = useState([]);
  const [filtered, filter] = useState(null);
  const [searched, search] = useState(null);
  const [tags, setTags] = useState([])

  const allCoins = useSelector(selectCoins);
  console.log(allCoins)
  const dispatch = useDispatch();
  useEffect(() => {
    if(allCoins.length) {
      setCoins(allCoins)
      let tags = [];
      allCoins.forEach(coin => coin.tags.forEach(tag => !tags.includes(tag) && tags.push(tag)))
      tags.sort()
      setTags(tags)
    } else dispatch(fetchCoinsThunk())
  }, [allCoins])

  const handleClick = e => {
    setCurrent(e.key);
  };

  const handleSearch = e => {
    const {value} = e.target
    setCoins(allCoins.filter(coin => coin.name.toLowerCase().includes(value) ||
      coin.symbol.toLowerCase().includes(value))
      .filter(coin => filtered ? coin.tags.includes(filtered) : true))
    search(value)
  }

  const handleFilter = value => {
    let searchedCoins;
    if (searched) {
      searchedCoins = allCoins.filter(coin => coin.name.toLowerCase().includes(searched) ||
      coin.symbol.toLowerCase().includes(searched))
    } else searchedCoins = allCoins;
    if(value === null) {
      setCoins(searchedCoins)
    } else setCoins(searchedCoins.filter(coin => coin.tags.includes(value)))
    filter(value);
  }

  return (
    <div className={styles.App}>
      {/*<Counter />*/}
      <header>
        <Menu className={styles.App__menu} onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          <Menu.Item key="all">
            All Coins
          </Menu.Item>
          <Menu.Item key="fave">
            Favorite Coins
          </Menu.Item>
        </Menu>
        <Input placeholder="Search Coins" onChange={handleSearch} />
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Filter by Tag"
          optionFilterProp="children"
          onChange={handleFilter}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value={null}></Option>
          {tags.map(tag => <Option value={tag}>{tag}</Option>)}
        </Select>
      </header>
      <CoinList data={coins} state={current} />
    </div>
  );
}

export default App;
