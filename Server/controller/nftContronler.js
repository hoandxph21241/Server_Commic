const axios = require("axios");

exports.createNFT = async (req, res) => {
  const PK =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI0NzU5ZWMzZi0xNGJjLTQwZmEtYjVlYi0wNDQyMDNjZmYxMGIiLCJzdWIiOiJjYzc3OWRjNC1jOTIyLTRkZWItYjRiOC0zY2RjZjE3MTNkNDEiLCJpYXQiOjE3MjE3NDk1MDh9.jSIdFMx4CVJC2cW2rUCLqhO4cwq6On1uS6mUX7NdSzA";

  //   if (req.method === "GET") {
  //     return res.render("NFT/create_NFT", { error: null });
  //   }
  // if (!PK) {
  //     console.error('PK is not defined');
  //     return res.status(500).send('Internal server error: PK is not defined');
  // }

  const { collectionId, description, imageUrl, name, attributes } = req.body;
  if (!collectionId || !description || !imageUrl || !name || !attributes) {
    return res.render("NFT/create_NFT", { message: "Thiếu Thông Tin" });
  }

  const config = {
    headers: {
      "x-api-key": PK,
      "Content-Type": "application/json",
    },
  };

  const payload = {
    details: {
      collectionId: req.body.collectionId,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      name: req.body.name,
      attributes: req.body.attributes,
    },
    destinationUserReferenceId: "1",
  };

  var requestOptions = {
    method: "POST",
    headers: config,
    body: payload,
    redirect: "follow",
  };

  console.log("Payload:", payload);
  try {
    const response = await axios.post(
      "https://api.gameshift.dev/nx/unique-assets",
      requestOptions
    );
    console.log(response);
    res.json({ message: "NFT created successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.response ? error.response.data : error.message });
  }
};

exports.createUniqueAsset = async (req, res) => {
  const {
    name,
    description,
    imageUrl,
    collectionId,
    traitType,
    value,
  } = req.body;
  if (req.method === "GET") {
    return res.render("NFT/create_NFT",{userLogin: req.session.userLogin});
  }

  if (req.method === "POST") {
    if (!collectionId) {
      msg = "COLLECTIONID Không được để trống!";
    }
    if (!description) {
      msg = "DESCRIPTION Không được để trống!";
    }
    if (!imageUrl) {
      msg = "IMG_URL Không được để trống!";
    }
    if (!name) {
      msg = "NAME Không được để trống!";
    }
    if (!traitType) {
      msg = "TRAITTYPER Không được để trống!";
    }
  }
  const options = {
    method: "POST",
    url: "https://api.gameshift.dev/nx/unique-assets",
    headers: {
      accept: "application/json",
      "x-api-key":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI0NzU5ZWMzZi0xNGJjLTQwZmEtYjVlYi0wNDQyMDNjZmYxMGIiLCJzdWIiOiJjYzc3OWRjNC1jOTIyLTRkZWItYjRiOC0zY2RjZjE3MTNkNDEiLCJpYXQiOjE3MjE3NDk1MDh9.jSIdFMx4CVJC2cW2rUCLqhO4cwq6On1uS6mUX7NdSzA",
      "content-type": "application/json",
    },
    data: {
      details: {
        attributes: [{ traitType, value }],
        collectionId: collectionId,
        description: description,
        imageUrl: imageUrl,
        name: name,
      },
      destinationUserReferenceId: "1",
    },
  };

  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.transferItem = async (req, res) => {
//   const { id_item, destinationUserReferenceId } = req.body;
//   let id = "1";
//   if (req.method === "GET") {
//     return res.render("transfer/transfer_item");
//   }

//   if (req.method === "POST") {
//     if (!id_item) {
//       return res.status(400).json({ message: "ID_ITEM không được để trống!" });
//     }
//     if (!destinationUserReferenceId) {
//       return res
//         .status(400)
//         .json({
//           message: "DESTINATION_USER_REFERENCE_ID không được để trống!",
//         });
//     }
//   }

//   const PK =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI0NzU5ZWMzZi0xNGJjLTQwZmEtYjVlYi0wNDQyMDNjZmYxMGIiLCJzdWIiOiJjYzc3OWRjNC1jOTIyLTRkZWItYjRiOC0zY2RjZjE3MTNkNDEiLCJpYXQiOjE3MjE3NDk1MDh9.jSIdFMx4CVJC2cW2rUCLqhO4cwq6On1uS6mUX7NdSzA";

//   const options = {
//     method: "POST",
//     url: `https://api.gameshift.dev/nx/users/${id}/items/${id_item}/transfer`,
//     headers: {
//       accept: "application/json",
//       "x-api-key": PK,
//       "content-type": "application/json",
//     },
//     data: {
//       quantity: 1,
//       destinationUserReferenceId: destinationUserReferenceId,
//     },
//   };

//   try {
//     const response = await axios(options);
//     res.status(200).json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// async function fetchItemIds(collectionId) {
//   const PK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI0NzU5ZWMzZi0xNGJjLTQwZmEtYjVlYi0wNDQyMDNjZmYxMGIiLCJzdWIiOiJjYzc3OWRjNC1jOTIyLTRkZWItYjRiOC0zY2RjZjE3MTNkNDEiLCJpYXQiOjE3MjE3NDk1MDh9.jSIdFMx4CVJC2cW2rUCLqhO4cwq6On1uS6mUX7NdSzA";
//   const apiUrl = `https://api.gameshift.dev/nx/asset-collections/${collectionId}/assets`;

//   try {
//     const response = await axios.get(apiUrl, {
//       headers: {
//         accept: 'application/json',
//         'x-api-key': PK,
//       },
//     });

//     const items = response.data.data;
//     const itemIds = items.map(item => item.item.id);
    
//     console.log("ID_ITEM _ NFT");
//     console.log(itemIds); 
//     return itemIds; 
//   } catch (error) {
//     console.error('Error fetching item IDs:', error.message);
//     return null; 
//   }
// }
// fetchItemIds('451f9c28-b41a-4f76-86c5-5b2a24729385');


let storedItemIds = [];
exports.fetchAndStoreItemIds = async (req, res) => {
  const { collectionId } = req.params;
  const PK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI0NzU5ZWMzZi0xNGJjLTQwZmEtYjVlYi0wNDQyMDNjZmYxMGIiLCJzdWIiOiJjYzc3OWRjNC1jOTIyLTRkZWItYjRiOC0zY2RjZjE3MTNkNDEiLCJpYXQiOjE3MjE3NDk1MDh9.jSIdFMx4CVJC2cW2rUCLqhO4cwq6On1uS6mUX7NdSzA";
  const apiUrl = `https://api.gameshift.dev/nx/asset-collections/${collectionId}/assets`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        accept: 'application/json',
        'x-api-key': PK,
      },
    });
    const items = response.data.data;
    storedItemIds = items.map(item => item.item.id);
    console.log("Stored Item IDs:", storedItemIds);
    res.status(200).json({ message: "Item IDs fetched and stored successfully.", itemIds: storedItemIds, userLogin: req.session.userLogin });
  } catch (error) {
    console.error('Error fetching item IDs:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// exports.transferItem = async (req, res) => {
//   const { id_item, destinationUserReferenceId } = req.body;
//   let userId = "1";
//   const PK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI0NzU5ZWMzZi0xNGJjLTQwZmEtYjVlYi0wNDQyMDNjZmYxMGIiLCJzdWIiOiJjYzc3OWRjNC1jOTIyLTRkZWItYjRiOC0zY2RjZjE3MTNkNDEiLCJpYXQiOjE3MjE3NDk1MDh9.jSIdFMx4CVJC2cW2rUCLqhO4cwq6On1uS6mUX7NdSzA";

//   if (!id_item) {
//     return res.status(400).json({ message: "ID_ITEM không được để trống!" });
//   }
//   if (!destinationUserReferenceId) {
//     return res
//       .status(400)
//       .json({
//         message: "DESTINATION_USER_REFERENCE_ID không được để trống!",
//       });
//   }

//   const options = {
//     method: "POST",
//     url: `https://api.gameshift.dev/nx/users/${userId}/items/${id_item}/transfer`,
//     headers: {
//       accept: "application/json",
//       "x-api-key": PK,
//       "content-type": "application/json",
//     },
//     data: {
//       quantity: 1,
//       destinationUserReferenceId: destinationUserReferenceId,
//     },
//   };

//   try {
//     const response = await axios(options);
//     res.status(200).json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// exports.transferItem = async (req, res) => {
//   const { id_item } = req.body;
//   const destinationUserReferenceId = req.session.userLogin?.referenceId;
//   const userId = "1";
//   const PK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI0NzU5ZWMzZi0xNGJjLTQwZmEtYjVlYi0wNDQyMDNjZmYxMGIiLCJzdWIiOiJjYzc3OWRjNC1jOTIyLTRkZWItYjRiOC0zY2RjZjE3MTNkNDEiLCJpYXQiOjE3MjE3NDk1MDh9.jSIdFMx4CVJC2cW2rUCLqhO4cwq6On1uS6mUX7NdSzA";
//   if (!id_item) {
//     return res.status(400).json({ message: "ID_ITEM không được để trống!" });
//   }
//   if (!destinationUserReferenceId) {
//     return res.status(400).json({ message: "DESTINATION_USER_REFERENCE_ID không được lấy từ session!" });
//   }

//   const options = {
//     method: "POST",
//     url: `https://api.gameshift.dev/nx/users/${userId}/items/${id_item}/transfer`,
//     headers: {
//       accept: "application/json",
//       "x-api-key": PK,
//       "content-type": "application/json",
//     },
//     data: {
//       quantity: 1,
//       destinationUserReferenceId: destinationUserReferenceId,
//     },
//   };

//   try {
//     const response = await axios(options);
//     res.status(200).json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// let userItemIds = [];
// const PK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI0NzU5ZWMzZi0xNGJjLTQwZmEtYjVlYi0wNDQyMDNjZmYxMGIiLCJzdWIiOiJjYzc3OWRjNC1jOTIyLTRkZWItYjRiOC0zY2RjZjE3MTNkNDEiLCJpYXQiOjE3MjE3NDk1MDh9.jSIdFMx4CVJC2cW2rUCLqhO4cwq6On1uS6mUX7NdSzA";
// exports.getItemNFT = async (req, res, next) => {
//   try {
//     const referenceId = 1;
//     try {
//       const response = await axios.get(`https://api.gameshift.dev/nx/users/${referenceId}/items?page=1&perPage=6`, {
//         headers: {
//           'accept': 'application/json',
//           'x-api-key': PK
//         }
//       });
//       if (response.data && response.data.data) {
//         userItemIds = response.data.data.map(item => item.id); 
//         msg = "Lấy danh sách tài sản thành công!";
//         req.session.userItemIds = userItemIds; 
//         console.log(userItemIds);
//       } else {
//         msg = "Không tìm thấy tài sản.";
//       }
//     } catch (apiError) {
//       console.error(apiError);
//     }
//   } catch (error) {
//     console.error(error);
//     msg = error.message;
//   }
// };

// exports.transferItem = async (req, res) => {
//   const destinationUserReferenceId = req.session.userLogin?.referenceId; 
//   const userId = "1"; 
//    const userItemIds = req.session.userItemIds;
//   if (!userItemIds || userItemIds.length === 0) {
//     return res.status(400).json({ message: "Không có item để chuyển!" });
//   }
//   const id_item = userItemIds[Math.floor(Math.random() * userItemIds.length)];
//   console.log(id_item);

//   if (!destinationUserReferenceId) {
//     return res.status(400).json({ message: "DESTINATION_USER_REFERENCE_ID không được lấy từ session!" });
//   }

//   const options = {
//     method: "POST",
//     url: `https://api.gameshift.dev/nx/users/${userId}/items/${id_item}/transfer`,
//     headers: {
//       accept: "application/json",
//       "x-api-key": PK,
//       "content-type": "application/json",
//     },
//     data: {
//       quantity: 1,
//       destinationUserReferenceId: destinationUserReferenceId,
//     },
//   };

//   try {
//     const response = await axios(options);
//     res.status(200).json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// exports.transferItem = async (req, res) => {
//   const destinationUserReferenceId = req.session.userLogin?.referenceId; 
//   const userId = "1"; // Có thể cần phải thay đổi thành giá trị thực tế
//   const userItemIds = req.session.userItemIds;

//   if (!userItemIds || userItemIds.length === 0) {
//     return res.status(400).json({ message: "Không có item để chuyển!" });
//   }
//   const id_item = userItemIds[Math.floor(Math.random() * userItemIds.length)];
//   console.log("Item ID:", id_item);

//   if (!destinationUserReferenceId) {
//     return res.status(400).json({ message: "DESTINATION_USER_REFERENCE_ID không được lấy từ session!" });
//   }

//   const options = {
//     method: "POST",
//     url: `https://api.gameshift.dev/nx/users/${userId}/items/${id_item}/transfer`,
//     headers: {
//       accept: "application/json",
//       "x-api-key": PK,
//       "content-type": "application/json",
//     },
//     data: {
//       quantity: 1,
//       destinationUserReferenceId: destinationUserReferenceId,
//     },
//   };

//   try {
//     const response = await axios(options);
//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error("Error during transfer:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };


// exports.transferItem = async (req, res) => {
//   const destinationUserReferenceId = req.session.userLogin?.referenceId; 
//   const userId = "1"; 
//   const userItemIds = req.session.userItemIds;

//   if (!userItemIds || userItemIds.length === 0) {
//     return res.status(400).json({ message: "Không có item để chuyển!" });
//   }

//   const id_item = userItemIds[Math.floor(Math.random() * userItemIds.length)];
//   console.log("Selected item ID:", id_item);

//   if (!destinationUserReferenceId) {
//     return res.status(400).json({ message: "DESTINATION_USER_REFERENCE_ID không được lấy từ session!" });
//   }

//   const options = {
//     method: "POST",
//     url: `https://api.gameshift.dev/nx/users/${userId}/items/${id_item}/transfer`,
//     headers: {
//       accept: "application/json",
//       "x-api-key": PK,
//       "content-type": "application/json",
//     },
//     data: {
//       quantity: 1,
//       destinationUserReferenceId: destinationUserReferenceId,
//     },
//   };

//   console.log(destinationUserReferenceId);

//   try {
//     const response = await axios(options);
//     const { transactionId, consentUrl } = response.data;

//     if (transactionId && consentUrl) {
//       res.status(200).json({ transactionId, consentUrl });
//     } else {
//       res.status(500).json({ message: "Dữ liệu phản hồi không hợp lệ" });
//     }
//   } catch (error) {
//     console.error("Error during transfer:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.transferItem = async (req, res) => {
//   // Lấy giá trị từ session
//   const destinationUserReferenceId = req.session.userLogin?.referenceId; 
//   const userId = "1"; 
//   const userItemIds = req.session.userItemIds;

//   // In ra giá trị từ session
//   console.log("Destination User Reference ID:", destinationUserReferenceId);
//   console.log("User Item IDs:", userItemIds);

//   // Kiểm tra xem có item để chuyển không
//   if (!userItemIds || userItemIds.length === 0) {
//     return res.status(400).json({ message: "Không có item để chuyển!" });
//   }

//   // Chọn một item ngẫu nhiên từ danh sách
//   const id_item = userItemIds[Math.floor(Math.random() * userItemIds.length)];
//   console.log("Selected item ID:", id_item);

//   // Kiểm tra xem destinationUserReferenceId có tồn tại không
//   if (!destinationUserReferenceId) {
//     return res.status(400).json({ message: "DESTINATION_USER_REFERENCE_ID không được lấy từ session!" });
//   }

//   // Cấu hình yêu cầu chuyển item
//   const options = {
//     method: "POST",
//     url: `https://api.gameshift.dev/nx/users/${userId}/items/${id_item}/transfer`,
//     headers: {
//       accept: "application/json",
//       "x-api-key": PK,
//       "content-type": "application/json",
//     },
//     data: {
//       quantity: 1,
//       destinationUserReferenceId: destinationUserReferenceId,
//     },
//   };

//   // In ra cấu hình yêu cầu
//   console.log("Request Options:", options);

//   try {
//     // Gửi yêu cầu tới API
//     const response = await axios(options);

//     // In ra phản hồi từ API
//     console.log("API Response:", response.data);

//     const { transactionId, consentUrl } = response.data;

//     if (transactionId && consentUrl) {
//       // Trả về dữ liệu thành công
//       res.status(200).json({ transactionId, consentUrl });
//     } else {
//       // Trả về lỗi nếu dữ liệu phản hồi không hợp lệ
//       res.status(500).json({ message: "Dữ liệu phản hồi không hợp lệ" });
//     }
//   } catch (error) {
//     // In ra lỗi nếu có lỗi trong quá trình chuyển item
//     console.error("Error during transfer:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.handleItemTransfer = async (req, res) => {
//   try {
//     const referenceId = req.session.userLogin?.referenceId;
//     console.log(req.session.userLogin);
//     if (!referenceId) {
//       return res.status(400).json({ message: "DESTINATION_USER_REFERENCE_ID không được lấy từ session!" });
//     }
    
//     const response = await axios.get(`https://api.gameshift.dev/nx/users/${referenceId}/items?page=1&perPage=6`, {
//       headers: {
//         'accept': 'application/json',
//         'x-api-key': PK
//       }
//     });

//     if (response.data && response.data.data) {
//       const userItemIds = response.data.data.map(item => item.id);
//       req.session.userItemIds = userItemIds;
//       console.log("User Item IDs:", userItemIds);

//       // Nếu có item để chuyển
//       if (userItemIds.length === 0) {
//         return res.status(400).json({ message: "Không có item để chuyển!" });
//       }

//       // Chọn một item ngẫu nhiên để chuyển
//       const id_item = userItemIds[Math.floor(Math.random() * userItemIds.length)];
//       console.log("Selected item ID:", id_item);

//       // Cấu hình yêu cầu chuyển item
//       const options = {
//         method: "POST",
//         url: `https://api.gameshift.dev/nx/users/${referenceId}/items/${id_item}/transfer`,
//         headers: {
//           accept: "application/json",
//           "x-api-key": PK,
//           "content-type": "application/json",
//         },
//         data: {
//           quantity: 1,
//           destinationUserReferenceId: referenceId,
//         },
//       };

//       // Gửi yêu cầu chuyển item
//       const transferResponse = await axios(options);
//       const { transactionId, consentUrl } = transferResponse.data;

//       if (transactionId && consentUrl) {
//         // Trả về dữ liệu thành công
//         res.status(200).json({ transactionId, consentUrl });
//       } else {
//         // Trả về lỗi nếu dữ liệu phản hồi không hợp lệ
//         res.status(500).json({ message: "Dữ liệu phản hồi không hợp lệ" });
//       }
//     } else {
//       return res.status(404).json({ message: "Không tìm thấy tài sản." });
//     }
//   } catch (error) {
//     // In ra lỗi nếu có lỗi trong quá trình lấy item hoặc chuyển item
//     console.error("Error during transfer:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI0NzU5ZWMzZi0xNGJjLTQwZmEtYjVlYi0wNDQyMDNjZmYxMGIiLCJzdWIiOiJjYzc3OWRjNC1jOTIyLTRkZWItYjRiOC0zY2RjZjE3MTNkNDEiLCJpYXQiOjE3MjE3NDk1MDh9.jSIdFMx4CVJC2cW2rUCLqhO4cwq6On1uS6mUX7NdSzA';
exports.getItemNFT = async (req, res, next) => {
  try {
    const referenceId = 1;
    const collectionId="451f9c28-b41a-4f76-86c5-5b2a24729385";
    try {
      const response = await axios.get(`https://api.gameshift.dev/nx/users/${referenceId}/items?page=1&perPage=6&collectionId=${collectionId}`, {
        headers: {
          'accept': 'application/json',
          'x-api-key': apiKey
        }
      });
      if (response.data && response.data.data) {
        const userItemIds = response.data.data.map(item => item.item.id);
        const msg = "Lấy danh sách tài sản thành công!";
        req.session.userItemIds = userItemIds; 
        console.log(userItemIds);
      }else {
        msg = "Không tìm thấy tài sản.";
      }
    } catch (apiError) {
      console.error(apiError);
    }
  } catch (error) {
    console.error(error);
    msg = error.message;
  }
};


exports.handleItemTransfer = async (req, res) => {
  let userItemIds = [];

  try {
    const referenceId = req.session.userLogin?.referenceId;
    if (!referenceId) {
      return res.status(400).json({ message: "DESTINATION_USER_REFERENCE_ID không được lấy từ session!" });
    }

    const reference = 1; 
    const collectionId = "451f9c28-b41a-4f76-86c5-5b2a24729385";

    try {
      const response = await axios.get(`https://api.gameshift.dev/nx/users/${reference}/items?page=1&perPage=6&collectionId=${collectionId}`, {
        headers: {
          'accept': 'application/json',
          'x-api-key': apiKey
        }
      });

      if (response.data && response.data.data) {
        userItemIds = response.data.data.map(item => item.item.id);
      } else {
        return res.status(404).json({ message: "Không tìm thấy tài sản." });
      }
    } catch (apiError) {
      return res.status(500).json({ message: "Lỗi khi gọi API lấy tài sản." });
    }

    if (userItemIds.length === 0) {
      return res.status(400).json({ message: "Không có item để chuyển!" });
    }

    const id_item = userItemIds[Math.floor(Math.random() * userItemIds.length)];

    const options = {
      method: "POST",
      url: `https://api.gameshift.dev/nx/users/${reference}/items/${id_item}/transfer`,
      headers: {
        accept: "application/json",
        "x-api-key": apiKey,
        "content-type": "application/json",
      },
      data: {
        quantity: "1",
        destinationUserReferenceId: referenceId,
      },
  
    };
    console.log(referenceId,id_item);
    try {
      const transferResponse = await axios(options);
      const { transactionId, consentUrl } = transferResponse.data;

      if (transactionId && consentUrl) {
        res.render('NFT/transfer_NFT', { 
          transactionId, 
          consentUrl,
          message: 'Chuyển item thành công!',
          userLogin: req.session.userLogin
        });
      } else {
        res.status(500).render('transactionResult', {
          message: 'Dữ liệu phản hồi không hợp lệ',
          transactionId: null,
          consentUrl: null
        });
      }
    } catch (transferError) {
      console.error("Lỗi khi gọi API chuyển tài sản:", transferError.response?.data || transferError.message);
      res.status(500).render('NFT/transfer_NFT', {
        message: 'Lỗi khi thực hiện chuyển nhượng tài sản',
        transactionId: null,
        consentUrl: null
      });
    }
  } catch (error) {
    res.status(500).render('NFT/transfer_NFT', {
      message: error.message
    });
  }
};
