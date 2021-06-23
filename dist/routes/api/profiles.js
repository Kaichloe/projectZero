"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfileByHandle = exports.addOrUpdateProfile = exports.getByHandle = exports.getAllProfiles = void 0;
const profileDao_1 = __importDefault(require("../../dao/profileDao"));
const profileDao = new profileDao_1.default();
/**
 * api route that calls function to get all profiles but only shows emails
 * @param req
 * @param res
 */
async function getAllProfiles(req, res) {
    try {
        const profiles = await profileDao.getProfiles();
        res.status(200).json(profiles);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ err: "something went wrong" });
    }
}
exports.getAllProfiles = getAllProfiles;
/**
 * api route that calls function to get profile by handle
 * if not found will return custom response
 * @param req
 * @param res
 */
async function getByHandle(req, res) {
    try {
        const { handle } = req.params;
        const profile = await profileDao.getProfileByHandle(handle);
        profile !== undefined ? res.status(200).json(profile) : res.json(`${handle} does not exist`);
    }
    catch (error) {
        res.status(500).json({ err: "something went wrong" });
    }
}
exports.getByHandle = getByHandle;
/**
 * api route that calls function to add or update existing profile
 * will check for age validation
 * @param req
 * @param res
 * @returns
 */
async function addOrUpdateProfile(req, res) {
    try {
        const { age } = req.body;
        if (Number(age) < 13) {
            return res.json("You must be 13 years of age to join FakeBook. Sorry");
        }
        const user = await profileDao.addOrUpdateProfile(req.body);
        res.status(200).json("You were successful!");
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ err: "something went wrong" });
    }
}
exports.addOrUpdateProfile = addOrUpdateProfile;
/**
 * api route that calls function to delete profile
 * by handle from the database
 * @param req
 * @param res
 */
async function deleteProfileByHandle(req, res) {
    try {
        const { handle } = req.params;
        const profile = await profileDao.deleteProfileByHandle(handle);
        res.status(200).json(`${handle}'s profile was successfully deleted`);
        res.status(200).json(profile);
    }
    catch (error) {
        res.status(500).json({ err: "something went wrong" });
    }
}
exports.deleteProfileByHandle = deleteProfileByHandle;
