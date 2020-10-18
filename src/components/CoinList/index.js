import React, { useState, useEffect } from 'react';
import { List, Card, Space, Button } from 'antd';
import styles from './index.module.scss';

function CoinList (props) {
  const [listData, setListData] = useState([]);

  const getFavorites = () => {
    const favorites = JSON.parse(window.localStorage.getItem('favorites'))
    return favorites ? favorites : []
  }

  useEffect(() => {
    const favorites = getFavorites()
    if (props.state === 'all') {
      setListData(props.data.map(coin => ({
        ...coin,
        isFav: favorites.includes(coin.id)
      })))
    } else if (props.state === 'fave') {
      if (favorites) {
        setListData(props.data.filter(coin => favorites.includes(coin.id)).map(coin => ({
          ...coin,
          isFav: true
        })))
      } else setListData([])
    }
  }, [props])

  const handleCoinClick = id => {
    let favorites = getFavorites();
    setListData(listData.map(coin => {
      if (coin.id === id) coin.isFav = !coin.isFav;
      return coin;
    }))
    if (favorites.includes(id)) {
      favorites = favorites.filter(_id => _id !== id)
      window.localStorage.setItem(
        'favorites',
        JSON.stringify(favorites)
      )
      props.state === 'fave' && setListData(listData.filter(coin => {
        return coin.id !== id
      }))
    } else {
      window.localStorage.setItem('favorites', JSON.stringify(favorites.concat([id])))
    }
  }

  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      pagination={{
        pageSize: 32,
      }}
      className={styles.list}
      dataSource={listData}
      renderItem={coin => (
        <List.Item
          key={coin.cmc_rank + '.' + coin.name}
          className={styles.list__item}
        >
          <p>{coin.symbol}</p>
          <div className={styles.list__item__data}>
            <List.Item.Meta
              title={coin.cmc_rank + '.' + coin.name}
              description={coin.quote.USD.price.toFixed(1) + '$'}
            />
            <Button onClick={() => handleCoinClick(coin.id)} type="primary">
              {coin.isFav ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
          </div>
        </List.Item>
      )}
    />
  );
}

export default CoinList;
