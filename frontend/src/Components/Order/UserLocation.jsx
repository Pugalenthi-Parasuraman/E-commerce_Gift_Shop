import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import {
  trackLiveLocation,
  clearLocation,
  orderDetail,
} from "../../actions/orderActions";
import { toast } from "react-toastify";
import "leaflet/dist/leaflet.css";
import "../../Styles/Home.css";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const blueIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const AutoFitBounds = ({ points }) => {
  const map = useMap();
  useEffect(() => {
    if (points.length > 1) {
      map.fitBounds(points);
    }
  }, [points, map]);
  return null;
};

const LiveLocationPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const mapRef = useRef(null);

  const {
    orderDetail: order,
    error,
    liveLocation,
  } = useSelector((state) => state.orderState);

  const [isTracking, setIsTracking] = useState(false);
  const chennai = [13.0827, 80.2707];

  const live =
    liveLocation?.latitude && liveLocation?.longitude
      ? [liveLocation.latitude, liveLocation.longitude]
      : null;

  const delivery = order?.shippingInfo?.coordinates
    ? [
        order.shippingInfo.coordinates.latitude,
        order.shippingInfo.coordinates.longitude,
      ]
    : null;

  const midpoint =
    live && live.length === 2
      ? [(chennai[0] + live[0]) / 2, (chennai[1] + live[1]) / 2]
      : null;

  const center =
    order?.orderStatus === "Shipped" && midpoint
      ? midpoint
      : order?.orderStatus === "Delivered" && delivery
      ? delivery
      : chennai;

  const trackIntervalRef = useRef(null);

  useEffect(() => {
    dispatch(orderDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (isTracking) {
      dispatch(trackLiveLocation(id));
      trackIntervalRef.current = setInterval(() => {
        dispatch(trackLiveLocation(id));
      }, 10000);
    } else {
      clearInterval(trackIntervalRef.current);
      dispatch(clearLocation());
    }
    return () => clearInterval(trackIntervalRef.current);
  }, [isTracking, dispatch, id]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const isValidCoords = (coords) =>
    Array.isArray(coords) &&
    coords.length === 2 &&
    typeof coords[0] === "number" &&
    typeof coords[1] === "number";

  const points = [chennai];
  if (order?.orderStatus === "Shipped" && isValidCoords(midpoint)) {
    points.push(midpoint);
    if (isValidCoords(delivery)) points.push(delivery);
  } else if (order?.orderStatus === "Delivered" && isValidCoords(delivery)) {
    points.push(delivery);
  } else if (order?.orderStatus === "Processing" && isValidCoords(delivery)) {
    points.push(delivery);
  }

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return null;
    const date = new Date(timestamp);
    return date.toLocaleString("en-IN", {
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">
          Order #
          {order?.customOrderId || `ORD-${order?._id?.slice(-6).toUpperCase()}`}
        </h1>
        <p className="text-gray-600 mb-2">
          Tracking Number: {order?.trackingNumber || "N/A"}
        </p>
        {isTracking && liveLocation?.timestamp && (
          <p className="text-red-600 font-semibold mb-2">
            📍 Last updated: {formatTimestamp(liveLocation.timestamp)}
          </p>
        )}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold mb-2">Current Status</h2>
            <span
              className={`px-4 py-2 rounded-md inline-block ${
                order?.orderStatus === "Delivered"
                  ? "bg-green-100 text-green-800"
                  : order?.orderStatus === "Shipped"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {order?.orderStatus || "Unknown"}
            </span>
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
        <h2 className="text-xl font-semibold mb-4">Live Location Map</h2>
        <div className="h-96 rounded overflow-hidden relative">
          <MapContainer
            center={center}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <AutoFitBounds points={points} />

            {/* Processing */}
            {order?.orderStatus === "Processing" && isValidCoords(delivery) && (
              <>
                <Marker position={chennai} icon={blueIcon}>
                  <Popup>Processing Center - Chennai</Popup>
                </Marker>
                <Marker position={delivery} icon={redIcon}>
                  <Popup>Expected Delivery Location</Popup>
                </Marker>
                <Polyline
                  positions={[chennai, delivery]}
                  color="blue"
                  weight={4}
                  dashArray="4,8"
                />
              </>
            )}

            {/* Shipped */}
            {order?.orderStatus === "Shipped" && (
              <>
                <Marker position={chennai} icon={blueIcon}>
                  <Popup>Chennai</Popup>
                </Marker>
                {isValidCoords(midpoint) && (
                  <>
                    <Marker position={midpoint} icon={greenIcon}>
                      <Popup>Midpoint</Popup>
                    </Marker>
                    <Polyline
                      positions={[chennai, midpoint]}
                      color="gray"
                      weight={4}
                      dashArray="5,10"
                    />
                  </>
                )}
                {isValidCoords(midpoint) && isValidCoords(delivery) && (
                  <>
                    <Marker position={delivery} icon={redIcon}>
                      <Popup>Destination</Popup>
                    </Marker>
                    <Polyline
                      positions={[midpoint, delivery]}
                      color="red"
                      weight={4}
                    />
                  </>
                )}
              </>
            )}

            {/* Delivered */}
            {order?.orderStatus === "Delivered" && isValidCoords(delivery) && (
              <>
                <Marker position={chennai} icon={blueIcon}>
                  <Popup>Origin - Chennai</Popup>
                </Marker>
                <Marker position={delivery} icon={redIcon}>
                  <Popup>Delivered</Popup>
                </Marker>
                <Polyline
                  positions={[chennai, delivery]}
                  color="gray"
                  weight={4}
                  dashArray="4,8"
                />
              </>
            )}
          </MapContainer>

          {isTracking && !live && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-md">
                <p className="text-center">Waiting for location updates...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveLocationPage;
