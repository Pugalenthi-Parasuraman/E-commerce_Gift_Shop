import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import {
  trackLiveLocation,
  clearLocation,
  orderDetail,
} from "../../actions/orderActions";
import { toast } from "react-toastify";
import "../../Styles/Home.css"


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LiveLocationPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const mapRef = useRef(null);

  const { order, loading, error } = useSelector((state) => state.orderState);
  const { liveLocation } = useSelector((state) => state.orderState);
  const [pathHistory, setPathHistory] = useState([]);
  const [isTracking, setIsTracking] = useState(false);


  useEffect(() => {
    dispatch(orderDetail(id));
  }, [dispatch, id]);

  
  useEffect(() => {
    if (isTracking) {
      dispatch(trackLiveLocation());
    } else {
      dispatch(clearLocation());
      setPathHistory([]);
    }
  }, [isTracking, dispatch]);

 
  useEffect(() => {
    if (liveLocation) {
      setPathHistory((prev) => [
        ...prev,
        [liveLocation.latitude, liveLocation.longitude],
      ]);

     
      if (mapRef.current) {
        mapRef.current.flyTo(
          [liveLocation.latitude, liveLocation.longitude],
          15
        );
      }
    }
  }, [liveLocation]);

 
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading)
    return <div className="text-center py-8">Loading order details...</div>;
  if (!order) return <div className="text-center py-8">Order not found</div>;

  
  const initialCenter = order.shippingInfo?.coordinates
    ? [
        order.shippingInfo.coordinates.latitude,
        order.shippingInfo.coordinates.longitude,
      ]
    : [20.5937, 78.9629]; 

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">
          Order #{order.customOrderId || order._id}
        </h1>
        <p className="text-gray-600 mb-4">
          Tracking Number: {order.trackingNumber}
        </p>

        <div className="flex flex-wrap items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Current Status</h2>
            <div
              className={`px-4 py-2 rounded-md inline-block ${
                order.orderStatus === "Delivered"
                  ? "bg-green-100 text-green-800"
                  : order.orderStatus === "Out for Delivery"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {order.orderStatus}
            </div>
          </div>

          <button
            onClick={() => setIsTracking(!isTracking)}
            className={`px-4 py-2 rounded-md text-white ${
              isTracking
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isTracking ? "Stop Tracking" : "Start Live Tracking"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Delivery Tracking</h2>
        <div className="h-96 rounded-md overflow-hidden relative">
          <MapContainer
            center={initialCenter}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            whenCreated={(map) => {
              mapRef.current = map;
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {order.shippingInfo?.coordinates && (
              <Marker
                position={[
                  order.shippingInfo.coordinates.latitude,
                  order.shippingInfo.coordinates.longitude,
                ]}
              >
                <Popup>Delivery Address</Popup>
              </Marker>
            )}

           
            {liveLocation && (
              <Marker
                position={[liveLocation.latitude, liveLocation.longitude]}
              >
                <Popup>
                  <div>
                    <p className="font-semibold">Delivery Personnel</p>
                    <p>
                      Last updated:{" "}
                      {new Date(liveLocation.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </Popup>
              </Marker>
            )}

           
            {pathHistory.length > 1 && (
              <Polyline
                positions={pathHistory}
                color="blue"
                weight={3}
                opacity={0.7}
              />
            )}
          </MapContainer>

          {isTracking && !liveLocation && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-md">
                <p className="text-center">Waiting for location updates...</p>
                <p className="text-sm text-gray-500 mt-2">
                  Make sure location services are enabled
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Tracking Information</h3>
          {liveLocation ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Latitude</p>
                <p className="font-medium">
                  {liveLocation.latitude.toFixed(6)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Longitude</p>
                <p className="font-medium">
                  {liveLocation.longitude.toFixed(6)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="font-medium">
                  {new Date(liveLocation.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">
              Live location tracking is currently inactive
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
        <div className="divide-y divide-gray-200">
          {order.orderItems.map((item, index) => (
            <div key={index} className="py-4 flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div className="flex-grow">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <p className="font-semibold">₹{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveLocationPage;
