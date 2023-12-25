/**
 * DO NOT EDIT THIS FILE DIRECTLY.
 * This file is generated following the conversion of 
 * @see [./FCA-TEMP/src/markAsDelivered.js]{@link ./FCA-TEMP/src/markAsDelivered.js}
 * 
 **/
import utils  from "../utils.mjs";
import log  from "../node_modules/npmlog/log.mjs";
"use strict";




export default function (defaultFuncs, api, ctx) {
	return function markAsDelivered(threadID, messageID, callback) {
		let resolveFunc = function () { };
		let rejectFunc = function () { };
		const returnPromise = new Promise(function (resolve, reject) {
			resolveFunc = resolve;
			rejectFunc = reject;
		});

		if (!callback) {
			callback = function (err, friendList) {
				if (err) {
					return rejectFunc(err);
				}
				resolveFunc(friendList);
			};
		}

		if (!threadID || !messageID) {
			return callback("Error: messageID or threadID is not defined");
		}

		const form = {};

		form["message_ids[0]"] = messageID;
		form["thread_ids[" + threadID + "][0]"] = messageID;

		defaultFuncs
			.post(
				"https://www.facebook.com/ajax/mercury/delivery_receipts.php",
				ctx.jar,
				form
			)
			.then(utils.saveCookies(ctx.jar))
			.then(utils.parseAndCheckLogin(ctx, defaultFuncs))
			.then(function (resData) {
				if (resData.error) {
					throw resData;
				}

				return callback();
			})
			.catch(function (err) {
				log.error("markAsDelivered", err);
				if (utils.getType(err) == "Object" && err.error === "Not logged in.") {
					ctx.loggedIn = false;
				}
				return callback(err);
			});

		return returnPromise;
	};
};