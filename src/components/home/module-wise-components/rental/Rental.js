import CustomContainer from "components/container";
import RentalBanner from "components/home/module-wise-components/rental/components/global/RentalBanner";
import { RentalModuleWrap } from "components/home/module-wise-components/rental/components/Rental.style";
import TopRatedVehicles from "components/home/module-wise-components/rental/components/home/TopRatedVehicles";
import VehicleCategories from "components/home/module-wise-components/rental/components/home/VehicleCategories";
import CouponsCarousel from "components/home/module-wise-components/rental/components/home/CouponsCarousel";
import DownloadSection from "components/home/module-wise-components/rental/components/home/DownloadSection";
import { getToken } from "helper-functions/getToken";
import TrendingBites from "components/home/trending-bites";

const Rental = ({ configData, landingPageData }) => {
  return (
    <RentalModuleWrap>
      <CustomContainer>
        <RentalBanner />
        <TrendingBites title="Trending Bites" />
        <TopRatedVehicles />
        <VehicleCategories />
        {getToken() && <CouponsCarousel />}
        <DownloadSection landingPageData={landingPageData} />
      </CustomContainer>
    </RentalModuleWrap>
  );
};

Rental.propTypes = {};

export default Rental;
