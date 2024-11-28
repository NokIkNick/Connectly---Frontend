import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Category from "../components/Category";
// Sample data (replace or fetch dynamically as needed)
//import { fecthcatgories } from "../../services/apiFacade";
import Modal from "../components/Modal";
import NewPostForm from "../components/NewPostForm";

    const Container = styled.div`
        display: flex;
        justify-content: space-between;
        margin-top: 15vh;
        padding: 1px;
        flex-wrap: wrap;
    `;

    const Column = styled.div`
        flex: 1;
        padding: 20px;
        margin: 0 5px;
    `;

    const FeedAndCategories = styled(Column)`
        flex: 0.5;
        height: 80vh;
        overflow-y: auto;
        scrollbar-width: none;
        @media (max-width: 1000px) {
            display: none;
        }
    `;

    const Feed = styled(Column)`
        flex: 2.5;
        height: 80vh;
        overflow-y: auto;
        scrollbar-width: none;
        @media (max-width: 768px) {
            flex: 2;
        }
        @media (max-width: 1500px) {
            flex: 1.5;
        }
    `;

    const Ads = styled(Column)`
        flex: 0.5;
        @media (max-width: 520px) {
            display: none;
        }
    `;

    const FACButton = styled.button`
        font-weight: bold;
        margin: 20px 0;
        background-color: ${(props) => (props.active ? "var(--blue)" : "var(--offwhite)")};
        color: ${(props) => (props.active ? "white" : "var(--blue)")};
        display: block;
        width: 100%;
        border: 2px var(--blue) solid;

        border-radius: 10px;
        padding: 20px 20px;
        cursor: pointer;

        &:hover {
            background-color: var(--blue);
        }
    `;

    const AD = styled.div`
        width: 100%;
        height: 40%;
        background-color: var(--light-grey);
        padding: 20px 20px;
        border-radius: 10px;
        margin: 20px 0;
    `;

    const InputBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: var(--white);
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    `;
        
    const ProfilePicture = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 20px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }
    `;
    
    const TextArea = styled.input`
    width: 100%;
    padding: 20px;
    margin: 20px 0;
    border-radius: 50px;
    font-size: 1.2rem;
    background-color: var(--background);
    border: none;
    &:hover {
        background-color: var(--light-grey);
    }
    `;

export const Mainpage = ({loggedInUser}) => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    

    // Sample data for the application
    const sampleData = [
        { id: 1, title: "Family Feed Content", category: "Travel", feed: "Family" },
        { id: 2, title: "Friends Feed Content", category: "Hobbies", feed: "Friends" },
        { id: 3, title: "Work Feed Content", category: "Education", feed: "Work" },
        { id: 4, title: "Another Family Content", category: "Travel", feed: "Family" },
    ];

    const feedOptions = ["Family", "Friends", "Work"];
    const categoryOptions = [
        "Travel",
        "Hobbies",
        "Education",
        "Health & Fitness",
        "Media",
        "Current Events",
        "Events",
        "Education",
    ];

    // State for managing feed and categories
    const [data, setData] = useState([]); // Holds full data
    const [filteredData, setFilteredData] = useState([]); // Data based on filters
    const [selectedFeed, setSelectedFeed] = useState("Default"); // Default feed
    const [selectedCategory, setSelectedCategory] = useState(""); // No category by default

    useEffect(() => {
        setData(sampleData);
        setFilteredData(sampleData);
    }, []);

    // Uncommented comment to emphasize fetching logic
    // useEffect(() => {
    //     // Fetch categories data when the component mounts
    //     const fetchData = async () => {
    //         try {
    //             const fetchedData = await fecthcatgories();
    //             setData(fetchedData); // Set data to the fetched categories
    //             setFilteredData(fetchedData); // Optionally, set filtered data to the fetched categories
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // Handle feed selection
    const handleFeedClick = (feed) => {
        const newFeed = feed === selectedFeed ? "Default" : feed;
        setSelectedFeed(newFeed);
    };

    // Handle category selection
    const handleCategoryClick = (category) => {
        const newCategory = category === selectedCategory ? "" : category;
        setSelectedCategory(newCategory);
    };

    // Update filtered data when feed or category changes
    useEffect(() => {
        const filtered = data.filter((item) => {
            const matchesFeed = selectedFeed === "Default" || item.feed === selectedFeed;
            const matchesCategory = !selectedCategory || item.category === selectedCategory;
            return matchesFeed && matchesCategory;
        });
        setFilteredData(filtered);
    }, [selectedFeed, selectedCategory, data]);

  

    return (
        <>
            <Container>
                <FeedAndCategories>
                    <h2>FEED </h2>
                    {feedOptions.map((feed) => (
                        <FACButton
                            key={feed}
                            active={selectedFeed === feed}
                            onClick={() => handleFeedClick(feed)}
                        >
                            {feed}
                        </FACButton>
                    ))}

                    <h2>CATEGORIES</h2>
                    {categoryOptions.map((category) => (
                        <Category
                            key={category}
                            name={category}
                            active={selectedCategory === category}
                            onClick={handleCategoryClick}
                        />
                    ))}
                </FeedAndCategories>

                <Feed>
                    <InputBox>
                        <ProfilePicture>
                            <img src="/user-svgrepo-com.svg" alt="" />
                        </ProfilePicture>
                        <TextArea
                            type="text"
                            placeholder={`What's on your mind, ${loggedInUser.fullName}?`}
                            onClick={handleOpenModal}
                        />
                    </InputBox>

                    <h2>Search Results</h2>
                    {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <div key={item.id}>
                                <h3>{item.title}</h3>
                                <p>Feed: {item.feed} | Category: {item.category}</p>
                            </div>
                        ))
                    ) : (
                        <p>No results found.</p>
                    )}
                </Feed>

                <Ads>
                    <AD>
                        <h2>AD</h2>
                    </AD>
                    <AD>
                        <h2>AD2</h2>
                    </AD>
                </Ads>
            </Container>

            <Modal show={showModal} onClose={handleCloseModal}>
                <NewPostForm />
            </Modal>
        </>
    );
};

export default Mainpage;
