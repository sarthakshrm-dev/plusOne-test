const User = require('../models/User');
const axios = require('axios')

exports.getData = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findOne({ id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error getting user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getHotels = async (req, res) => {
  try {
    const body = {
	    "CheckInDate": "30/08/2023",
	    "NoOfNights": "1",
	    "CountryCode": "AE",
	    "CityId": "115936",
	    "IsTBOMapped": "true",
	    "ResultCount": null,
	    "PreferredCurrency": "INR",
	    "GuestNationality": "IN",
	    "NoOfRooms": "2",
	    "RoomGuests": [
	        {
	            "NoOfAdults": 1,
	            "NoOfChild": 2,
	            "ChildAge": [
	                10,
	                10
	            ]
	        },
	        {
	            "NoOfAdults": 2,
	            "NoOfChild": 0
	        }
	    ],
	    "MaxRating": 5,
	    "MinRating": 0,
	    "ReviewScore": null,
	    "IsNearBySearchAllowed": false,
	    "EndUserIp": "123.1.1.1",
	    "TokenId": "681d1b5e-1685-4028-bad4-3295bcfc8684"
	  };

    const headers = {
      "Content-Type": "application/json"
    }

    let hotels = null

    await axios.post('http://api.tektravels.com/BookingEngineService_Hotel/hotelservice.svc/rest/GetHotelResult/', body, headers).then((res) => {
        hotels = res.data.HotelSearchResult.HotelResults
    })

    hotels.sort((a, b) => a.price.PublishedPrice - b.price.PublishedPrice);

    res.status(200).json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
