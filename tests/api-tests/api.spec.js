import {test, expect, request} from "@playwright/test";
import users from "../../test-data/usersResponse.json" assert {type: "json"};

test.describe("API verification examples", () => {
  // 1 Verify users endpoint is returning expected users
  test("Verify multiple records returned against static response", async ({request}) => {
    // save row responce in to variable
    const response = await request.get("https://reqres.in/api/users?page=2");

    // parse responce body into JS object with access to actual data within the responce body
    const responseBody = await response.json();
    // console.log("Response Body --------------", responseBody);

    // verify response status is 200
    expect(response.status()).toBe(200);
    // verify users response
    expect(responseBody).toEqual(users);
  });

  test("Verify single user", async ({request}) => {
    const response = await request.get("https://reqres.in/api/users/2");
    const responseBody = await response.json();
    // console.log("Response Body --------------", responseBody);

    expect(response.status()).toBe(200);
    expect(responseBody.data.id).toBe(2);
    expect(responseBody.data.email).toBe("janet.weaver@reqres.in");
    expect(responseBody.data.first_name).toBe("Janet");
    expect(responseBody.data.last_name).toBe("Weaver");
    expect(responseBody.data.avatar).toBe("https://reqres.in/img/faces/2-image.jpg");

    expect(responseBody.data).not.toBeUndefined();
    expect(responseBody.data).not.toBeNull();
    expect(responseBody.data).toBeTruthy();
  });

  test("Verify POST request", async ({request}) => {
    const newUser = {
      name: "Sam",
      job: "QA Engineer",
    };

    const response = await request.post("https://reqres.in/api/users", {
      data: newUser,
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });

    const responseBody = await response.json();
    // console.log("Response Body --------------", responseBody);

    expect(response.status()).toBe(201);
    expect(responseBody.name).toBe(newUser.name);
    expect(responseBody.job).toBe(newUser.job);
    expect(responseBody.id).toBeTruthy();
  });

  test("Verify PUT request", async ({request}) => {
    const updatedUser = {
      name: "Mark",
      job: "Developer BE",
    };

    const response = await request.put("https://reqres.in/api/users/2", {
      data: updatedUser,
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });

    const responseBody = await response.json();
    // console.log("Response Body --------------", responseBody);

    expect(response.status()).toBe(200);
    expect(responseBody.name).toBe(updatedUser.name);
    expect(responseBody.job).toBe(updatedUser.job);
    expect(responseBody.updatedAt).toBeTruthy();
  });

  test("Verify User is deleted", async ({request}) => {
    const response = await request.delete("https://reqres.in/api/users/2", {
      headers: {
        "x-api-key": "reqres-free-v1",
      },
    });

    expect(response.status()).toBe(204);
  });
});
