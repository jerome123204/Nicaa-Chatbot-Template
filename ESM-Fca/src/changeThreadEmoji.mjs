/**
 * DO NOT EDIT THIS FILE DIRECTLY.
 * This file is generated following the conversion of 
 * @see [./FCA-TEMP/src/changeThreadEmoji.js]{@link ./FCA-TEMP/src/changeThreadEmoji.js}
 * 
 **/
import utils  from "../utils.mjs";
import log  from "../node_modules/npmlog/log.mjs";
"use strict";




export default function (defaultFuncs, api, ctx) {
	return function changeThreadEmoji(emoji, threadID, callback) {
		let resolveFunc = function () { };
		let rejectFunc = function () { };
		const returnPromise = new Promise(function (resolve, reject) {
			resolveFunc = resolve;
			rejectFunc = reject;
		});

		if (!callback) {
			callback = function (err) {
				if (err) {
					return rejectFunc(err);
				}
				resolveFunc();
			};
		}
		const form = {
			emoji_choice: emoji,
			thread_or_other_fbid: threadID
		};

		defaultFuncs
			.post(
				"https://www.facebook.com/messaging/save_thread_emoji/?source=thread_settings&__pc=EXP1%3Amessengerdotcom_pkg",
				ctx.jar,
				form
			)
			.then(utils.parseAndCheckLogin(ctx, defaultFuncs))
			.then(function (resData) {
				if (resData.error === 1357031) {
					throw {
						error:
							"Trying to change emoji of a chat that doesn't exist. Have at least one message in the thread before trying to change the emoji."
					};
				}
				if (resData.error) {
					throw resData;
				}

				return callback();
			})
			.catch(function (err) {
				log.error("changeThreadEmoji", err);
				return callback(err);
			});

		return returnPromise;
	};
};