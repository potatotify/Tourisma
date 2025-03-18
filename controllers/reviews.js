const Review=require("../models/review");
const Listing=require("../models/listing");

module.exports.createReview=async (req, res, next) => {
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }

    let newReview = new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    console.log("New review saved");
    req.flash("success","new review created");

    res.redirect(`/listings/${req.params.id}`);
}


module.exports.destroyReview= async (req, res, next) => {
    let { id, reviewId } = req.params;

    let listing = await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }

    let deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) {
        throw new ExpressError(404, "Review not found");
    }

    console.log(`Review ${reviewId} deleted`);
    req.flash("success","review deleted");
    res.redirect(`/listings/${id}`);
}