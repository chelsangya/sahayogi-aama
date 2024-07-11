import axios from "axios";
import add_aama_mock from "../../mock/add_aama_mock";
import add_booking from "../../mock/add_booking_mock";
import all_booking from "../../mock/all_booking_mock";
import all_favourite_mock from "../../mock/all_favourite_mock";
import create_contact from "../../mock/create_contact_mock";
import create_fav_mock from "../../mock/create_fav_mock";
import all_contact from "../../mock/get_all_contact_mock";
import login_mock from "../../mock/login_mock";
import register_mock from "../../mock/register_mock";

const baseURL = "http://localhost:5500";
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWY3N2E2ZGRhNDBlMDBkMWQ0NjI0MyIsImlhdCI6MTcwOTQwMzE1N30.tpJc3tMfnmTiZHu6d0iYHti819iVUBX8t2uSnzKP74c";

describe("Frontend Testing using mockito", () => {
  it("Login", async () => {
    const response = await axios.post(`${baseURL}/api/user/login`, login_mock);
    expect(response.status).toEqual(200);
    expect(response.data.success).toEqual(true);
  });

  it("Register", async () => {
    const response = await axios.post(
      `${baseURL}/api/user/create`,
      register_mock
    );
    expect(response.status).toEqual(200);
    expect(response.data.success).toEqual(true);
  });

  it("Fetch all contact", async () => {
    const response = await axios.get(`${baseURL}/api/contact/all`);
    expect(response.data.contact).toBeDefined();

    expect(response.data.contact.name).toEqual(all_contact.name);
  });

  it("Fetch all favourite", async () => {
    const response = await axios.get(`${baseURL}/api/favourite/all`);
    // expect(response.data.fav).toBeDefined();

    response.data.fav.forEach((favs, index) => {
      expect(favs.by).toEqual(all_favourite_mock[index].by);
    });
  });

  "Create Fav",
    async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${baseURL}/api/favourite/create`,
        create_fav_mock,
        config
      );
      expect(response.data.success).toEqual(false);
    };

  it("Fetch all contact", async () => {
    const response = await axios.get(`${baseURL}/api/contact/all`);
    expect(response.data.contact).toBeDefined();

    expect(response.data.contact.name).toEqual(all_contact.name);
  });

  it("Fetch all bookings", async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${baseURL}/api/booking/all`, config);
    expect(response.data.bookings).toBeDefined();

    response.data.bookings.forEach((individualbookings, index) => {
      expect(individualbookings.startDate).toEqual(
        all_booking[index].startDate
      );
    });
  });

  it("Add Aama", async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${baseURL}/api/aama/create`,
      add_aama_mock,
      config
    );
    expect(response.status).toEqual(200);
    expect(response.data.success).toEqual(true);
  });

  it("Create Booking", async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${baseURL}/api/booking/create`,
      add_booking,
      config
    );
    expect(response.data.success).toEqual(false);
  });

  it("Send Contact", async () => {
    const response = await axios.post(
      `${baseURL}/api/contact/create`,
      create_contact
    );
    expect(response.status).toEqual(200);
    expect(response.data.success).toEqual(true);
  });

  it("Booking Delete", async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(
      `${baseURL}/api/booking/delete/65c9fbf7d36a31e08788e70a`,
      config
    );
    expect(response.status).toEqual(201);
    expect(response.data.success).toEqual(true);
  });
});
