const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    // default: "https://media.istockphoto.com/id/2149306940/photo/friends-dancing-and-having-fun-on-the-beach.jpg?s=1024x1024&w=is&k=20&c=4VawMt8bQK5BN_pNqtNsGQQnEhjqg1ygWE90B0olg3E=",
    // set: (v) => v === ""
    //     ?
    // set: (v) => v === "" ? undefined : v
    // image: {
    //     type: String,
    //     set: v => String(v)  // Automatically convert to string
    //   },
    // filename: String,
    // url: String,
    ///The part that worked earlier is :
    // type: String,
    // default:"https://media.istockphoto.com/id/2149306940/photo/friends-dancing-and-having-fun-on-the-beach.jpg?s=1024x1024&w=is&k=20&c=4VawMt8bQK5BN_pNqtNsGQQnEhjqg1ygWE90B0olg3E=",
    // set: (v) =>
    //   v === ""
    //     ? "https://media.istockphoto.com/id/2149306940/photo/friends-dancing-and-having-fun-on-the-beach.jpg?s=1024x1024&w=is&k=20&c=4VawMt8bQK5BN_pNqtNsGQQnEhjqg1ygWE90B0olg3E="
    //     : v,
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

//Mongoose Middleware
listingSchema.post("findOneAndDelete", async (listing) => {
  // console.log("Deleted listing:", listing);
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
