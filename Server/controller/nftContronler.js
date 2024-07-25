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
    destinationUserReferenceId,
  } = req.body;
  if (req.method === "GET") {
    return res.render("NFT/create_NFT");
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
