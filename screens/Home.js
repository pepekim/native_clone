/* eslint-disable react-native/no-inline-styles */
import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {color} from 'react-native-reanimated';

import {icons, images, SIZES, COLORS, FONTS} from '../constants';

const Home = ({navigation}) => {
  const [categories, setCategories] = useState(categoryData);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [restaurants, setRestaurants] = useState(restaurantData);
  const [currentLocation, setCurrentLocation] = useState(
    initialCurrentLocation,
  );

  const onSelectCategory = (category) => {
    // filter Restaurant
    let restaurantList = restaurantData.filter((a) =>
      a.categories.includes(category.id),
    );

    setRestaurants(restaurantList);
    setSelectedCategory(category);
  };

  const getCategoryNameById = (id) => {
    let category = categories.filter((a) => a.id == id);

    if (category.length > 0) {
      return category[0].name;
    }
    return '';
  };

  const renderHeader = () => {
    return (
      <View style={{flexDirection: 'row', height: 50}}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            width: 50,
            paddingLeft: SIZES.padding * 2,
          }}>
          <Image
            source={icons.nearby}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '70%',
              height: '100%',
              backgroundColor: COLORS.lightGray3,
              borderRadius: SIZES.radius,
            }}>
            <Text style={{...FONTS.h3}}>
              {initialCurrentLocation.streetName}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            width: 50,
            paddingRight: SIZES.padding * 2,
          }}>
          <Image
            source={icons.basket}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderMainCategories = () => {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor:
              selectedCategory?.id === item.id ? COLORS.primary : COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SIZES.padding,
            ...styles.shadow,
          }}
          onPress={() => onSelectCategory(item)}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                selectedCategory?.id === item.id
                  ? COLORS.white
                  : COLORS.lightGray,
            }}>
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </View>
          <Text
            style={{
              marginTop: SIZES.padding,
              color:
                selectedCategory?.id === item.id ? COLORS.white : COLORS.black,
              ...FONTS.body5,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{padding: SIZES.padding * 2}}>
        <Text style={{...FONTS.h1}}>Main</Text>
        <Text style={{...FONTS.h1}}>Categories</Text>
        <FlatList
          data={categories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{paddingVertical: SIZES.padding * 2}}
        />
      </View>
    );
  };

  const renderRestaurantList = () => {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{margin: SIZES.padding * 2}}
          onPress={() =>
            navigation.navigate('Restaurant', {
              item,
              currentLocation,
            })
          }>
          <View sytle={{marginBottom: SIZES.padding}}>
            <Image
              source={item.photo}
              resizeMode="cover"
              style={{
                width: '100%',
                height: 200,
                borderRadius: SIZES.radius,
              }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                height: 50,
                width: SIZES.width * 0.3,
                backgroundColor: COLORS.white,
                borderTopRightRadius: SIZES.radius,
                borderBottomLeftRadius: SIZES.radius,
                justifyContent: 'center',
                alignItems: 'center',
                ...styles.shadow,
              }}>
              <Text style={{...FONTS.h4}}>{item.duration}</Text>
            </View>
          </View>
          <Text style={{...FONTS.body2}}>{item.name}</Text>
          <View style={{marginTop: SIZES.padding, flexDirection: 'row'}}>
            <Image
              source={icons.star}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.primary,
                marginRight: 10,
              }}
            />
            <Text {...FONTS.body3}>{item.rating}</Text>
            <View style={{flexDirection: 'row', marginLeft: 10}}>
              {item.categories.map((categoryId) => {
                return (
                  <View style={{flexDirection: 'row'}} key={categoryId}>
                    <Text style={{...FONTS.body3}}>
                      {getCategoryNameById(categoryId)}
                    </Text>
                    <Text style={{...FONTS.h3, color: COLORS.darkgray}}>.</Text>
                  </View>
                );
              })}
              {[1, 2, 3].map((priceRating) => {
                <Text
                  key={priceRating}
                  style={{
                    ...FONTS.body3,
                  }}>
                  $
                </Text>;
              })}
            </View>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View>
        <FlatList
          data={restaurants}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingHorizontal: SIZES.padding * 2,
            paddingBottom: 30,
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderMainCategories()}
      {renderRestaurantList()}
    </SafeAreaView>
  );
};

const initialCurrentLocation = {
  streetName: '의문의 코딩공장',

  gps: {
    latitude: 37.504505,
    longitude: 127.043798,
  },

  // gps: {
  //   latitude: 1.5496614931250685,
  //   longitude: 110.36381866919922,
  // },
};

const categoryData = [
  {
    id: 1,
    name: 'Burgers',
    icon: icons.hamburger,
  },
  {
    id: 2,
    name: 'Pizza',
    icon: icons.pizza,
  },
  {
    id: 3,
    name: 'Hot Dogs',
    icon: icons.hotdog,
  },
  {
    id: 4,
    name: 'Sushi',
    icon: icons.sushi,
  },
  {
    id: 5,
    name: 'Noodles',
    icon: icons.noodle,
  },
  {
    id: 6,
    name: 'Desserts',
    icon: icons.donut,
  },
];

// price rating
const affordable = 1;
const fairPrice = 2;
const expensive = 3;

const restaurantData = [
  {
    id: 1,
    name: '태현 버거',
    rating: 4.8,
    categories: [1],
    priceRating: affordable,
    photo: images.burger_restaurant_1,
    duration: '30 - 45 min',
    // location: {
    //   latitude: 1.5347382806345879,
    //   longitude: 110.35632207358996,
    // },
    location: {
      latitude: 37.503505,
      longitude: 127.046798,
    },
    courier: {
      avatar: images.avatar_1,
      name: 'Amy',
    },
    menu: [
      {
        menuId: 1,
        name: 'Crispy Chicken Burger',
        photo: images.crispy_chicken_burger,
        description: 'Burger with crispy chicken, cheese and lettuce',
        calories: 200,
        price: 10,
      },
      {
        menuId: 2,
        name: 'Crispy Chicken Burger with Honey Mustard',
        photo: images.honey_mustard_chicken_burger,
        description: 'Crispy Chicken Burger with Honey Mustard Coleslaw',
        calories: 250,
        price: 15,
      },
      {
        menuId: 3,
        name: 'Crispy Baked French Fries',
        photo: images.baked_fries,
        description: 'Crispy Baked French Fries',
        calories: 194,
        price: 8,
      },
    ],
  },
  {
    id: 2,
    name: '세원 피자',
    rating: 4.8,
    categories: [2],
    priceRating: expensive,
    photo: images.pizza_restaurant,
    duration: '15 - 20 min',
    location: {
      latitude: 37.502505,
      longitude: 127.041798,
    },

    // location: {
    //   latitude: 1.556306570595712,
    //   longitude: 110.35504616746915,
    // },
    courier: {
      avatar: images.avatar_2,
      name: 'Jackson',
    },
    menu: [
      {
        menuId: 4,
        name: 'Hawaiian Pizza',
        photo: images.hawaiian_pizza,
        description: 'Canadian bacon, homemade pizza crust, pizza sauce',
        calories: 250,
        price: 15,
      },
      {
        menuId: 5,
        name: 'Tomato & Basil Pizza',
        photo: images.pizza,
        description:
          'Fresh tomatoes, aromatic basil pesto and melted bocconcini',
        calories: 250,
        price: 20,
      },
      {
        menuId: 6,
        name: 'Tomato Pasta',
        photo: images.tomato_pasta,
        description: 'Pasta with fresh tomatoes',
        calories: 100,
        price: 10,
      },
      {
        menuId: 7,
        name: 'Mediterranean Chopped Salad ',
        photo: images.salad,
        description: 'Finely chopped lettuce, tomatoes, cucumbers',
        calories: 100,
        price: 10,
      },
    ],
  },
  {
    id: 3,
    name: '문주 핫도그',
    rating: 4.8,
    categories: [3],
    priceRating: expensive,
    photo: images.hot_dog_restaurant,
    duration: '20 - 25 min',
    location: {
      latitude: 37.504505,
      longitude: 127.040798,
    },
    courier: {
      avatar: images.avatar_3,
      name: 'James',
    },

    menu: [
      {
        menuId: 8,
        name: 'Chicago Style Hot Dog',
        photo: images.chicago_hot_dog,
        description: 'Fresh tomatoes, all beef hot dogs',
        calories: 100,
        price: 20,
      },
    ],
  },
  {
    id: 4,
    name: '혜수시',
    rating: 4.8,
    categories: [4],
    priceRating: expensive,
    photo: images.japanese_restaurant,
    duration: '10 - 15 min',
    location: {
      latitude: 37.510505,
      longitude: 127.041798,
    },
    courier: {
      avatar: images.avatar_4,
      name: 'Ahmad',
    },
    menu: [
      {
        menuId: 9,
        name: 'Sushi sets',
        photo: images.sushi,
        description: 'Fresh salmon, sushi rice, fresh juicy avocado',
        calories: 100,
        price: 50,
      },
    ],
  },
  {
    id: 5,
    name: '상혁 누들',
    rating: 4.8,
    categories: [5],
    priceRating: affordable,
    photo: images.noodle_shop,
    duration: '15 - 20 min',
    location: {
      latitude: 37.499505,
      longitude: 127.043498,
    },
    courier: {
      avatar: images.avatar_4,
      name: 'Muthu',
    },
    menu: [
      {
        menuId: 10,
        name: 'Kolo Mee',
        photo: images.kolo_mee,
        description: 'Noodles with char siu',
        calories: 200,
        price: 5,
      },
      {
        menuId: 11,
        name: 'Sarawak Laksa',
        photo: images.sarawak_laksa,
        description: 'Vermicelli noodles, cooked prawns',
        calories: 300,
        price: 8,
      },
      {
        menuId: 12,
        name: 'Nasi Lemak',
        photo: images.nasi_lemak,
        description: 'A traditional Malay rice dish',
        calories: 300,
        price: 8,
      },
      {
        menuId: 13,
        name: 'Nasi Briyani with Mutton',
        photo: images.nasi_briyani_mutton,
        description: 'A traditional Indian rice dish with mutton',
        calories: 300,
        price: 8,
      },
    ],
  },
  {
    id: 6,
    name: '디저트',
    rating: 4.9,
    categories: [6],
    priceRating: affordable,
    photo: images.kek_lapis_shop,
    duration: '35 - 40 min',
    location: {
      latitude: 37.5048312312,
      longitude: 127.04372522132,
    },
    courier: {
      avatar: images.avatar_1,
      name: 'Jessie',
    },
    menu: [
      {
        menuId: 12,
        name: 'Teh C Peng',
        photo: images.teh_c_peng,
        description: 'Three Layer Teh C Peng',
        calories: 100,
        price: 2,
      },
      {
        menuId: 13,
        name: 'ABC Ice Kacang',
        photo: images.ice_kacang,
        description: 'Shaved Ice with red beans',
        calories: 100,
        price: 3,
      },
      {
        menuId: 14,
        name: 'Kek Lapis',
        photo: images.kek_lapis,
        description: 'Layer cakes',
        calories: 300,
        price: 20,
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});

export default Home;
