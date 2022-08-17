import request from "@/utils/request";
import utils from "@/utils/utils";

// NFT/BuyNFT

export const BuyNft = (num) => {
  const data = utils.initFormData({
    ads: localStorage.getItem("myaddress"),
    sign: localStorage.getItem("mysign"),
    hx: num,
  });

  return request({
    url: "/api/NFT/BuyNFT",
    method: "POST",
    data,
  });
};

export const myNft = (type) => {
  const data = utils.initFormData({
    ads: localStorage.getItem("myaddress"),
    sign: localStorage.getItem("mysign"),
    type,
  });
  //   const data = utils.initFormData({
  //     ads:'TBo2VnuGP7cKbuhfduML87npaKsxz81n1D',
  //     sign:"2a1be4c825ae6cb3b4c4f21a31741246",
  //     type
  //  });

  return request({
    url: "/api/NFT/mYnft",
    method: "POST",
    data,
  });
};
