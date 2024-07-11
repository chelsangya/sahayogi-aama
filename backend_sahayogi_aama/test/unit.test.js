const request = require("supertest");
const app = require("../index");

describe("Api testing", () => {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YWY3N2E2ZGRhNDBlMDBkMWQ0NjI0MyIsImlhdCI6MTcwOTQwMzE1N30.tpJc3tMfnmTiZHu6d0iYHti819iVUBX8t2uSnzKP74c";

  it("POST/api/user/login | Response with valid json", async () => {
    const response = await request(app).post("/api/user/login").send({
      email: "abhi@user.com",
      password: "user",
    });
    console.log(response.body);
    if (response.body.success) {
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Logged in successfully");
      expect(response.body.token).toBeDefined();
    }
  });

  it("POST/api/user/create | Response with valid json", async () => {
    const response = await request(app).post("/api/user/create").send({
      fullName: "test",
      email: "test@gmail.com",
      password: "test12345",
      phoneNumber: '9800000000',
      address: 'Pokhara'
    });

    console.log(response.body);
    if (response.body.success) {
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("User created successfully");
    } else {
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Email is already in use");
    }
  });

  it("POST/api/aama/create | Response with valid json", async () => {
    const response = await request(app)
      .post("/api/aama/create")
      .send({
        name: 'Test aama',
        age: '20',
        time: 'Part',
        charge: '200',
        experience: 'None',
        speciality: 'None',
        language: 'Nepali',
        // description: 'hello',
        isVerified: true,
        // aamaImageUrl: 'uploadedImage ? uploadedImage.secure_url : null',
      })
      .set("Authorization", `Bearer ${token}`);
    console.log(response.body);
    if (response.body.success) {
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Aama added successfully");
    } else {
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Please fill all the fields.");
    }
  });

  it("POST/api/booking/create | Response with valid json", async () => {
    const response = await request(app)
      .post("/api/booking/create")
      .send({
        aamaId: '65e36c653244e27999656702',
        // by: 'userId',
        startDate: '2023-03-02',
        endDate: '2023-03-04',
      })
      .set("Authorization", `Bearer ${token}`);
    console.log(response.body);
    if (response.body.success) {
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Aama booked successfully");
    } else {
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Aama already booked for the specified time and date");
    }
  });

  it("POST/api/contact/create | Response with valid json", async () => {
    const response = await request(app)
      .post("/api/contact/create")
      .send({
        name: 'hello',
        email: "hello@gmail.com",
        number: '9800000000',
        message: 'hello'
      })
    console.log(response.body);
    if (response.body.success) {
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Submitted successfully !!");
    } else {
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("All fields are required !!");
    }
  });

  it("GET/api/contact/all | Response with valid json", async () => {
    const response = await request(app)
      .get("/api/contact/all")
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Contacts Fetched");
  });

  it("GET/api/aama/get | Response with valid json", async () => {
    const response = await request(app)
      .get("/api/aama/get")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Aama fetched successfully");
  });

  it("GET Booking | fetch bookings", async () => {
    const response = await request(app)
      .get("/api/booking/all")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.success).toBe(true);
  });

  it("GET Aama by id | fetch aama detail", async () => {
    const response = await request(app)
      .get("/api/aama/getById/65e36e152c5d5ec996bd6111")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(
      "Aama Fetched By Id"
    );
  });

  it("GET/api/favourite/all | Response with valid json", async () => {
    const response = await request(app)
      .get("/api/favourite/all").set("Authorization", `Bearer ${token}`);
    expect(response.body.success).toBe(true);
  });

});
