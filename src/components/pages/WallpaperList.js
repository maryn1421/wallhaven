import React, { useState, useEffect } from "react";
import { useHttp } from "../../hooks/http";

const WallpaperList = (props) => {
  const [wallpaperUrl, setWallpaperUrl] = useState(props.url);
  const [limit] = useState(parseInt(props.limit));
  const [wallpapers, setWallpapers] = useState([]);
  const [isLoading, fetchedData] = useHttp(wallpaperUrl, [wallpaperUrl, limit]);

  useEffect(() => {
    console.log("useeffect start");
    console.log(isLoading);
    if (fetchedData) {
      setWallpapers(fetchedData.data.data);
    }
    console.log("useeffect end");
  }, [fetchedData]);

  let content = <p>Loading...</p>;

  if (wallpapers) {
    content = (
      <React.Fragment>
        <div>
          {wallpapers.slice(0, limit).map((wallpaper) => (
            <img
              src={wallpaper.thumbs.small}
              alt="Wallpaper"
              key={wallpaper.thumbs.small}
            />
          ))}
        </div>
      </React.Fragment>
    );
  } else if (fetchedData && !wallpapers) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
};

export default WallpaperList;
