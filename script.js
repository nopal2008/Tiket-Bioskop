     // Sample movie data
        const movies = {
            nowShowing: [
                {
                    id: 1,
                    title: "Avengers: Endgame",
                    genre: "Action, Adventure, Sci-Fi",
                    duration: "3h 1m",
                    synopsis: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
                    poster: "film-thaghut.jpeg",
                    rating: "PG-13"
                },
                {
                    id: 2,
                    title: "The Batman",
                    genre: "Action, Crime, Drama",
                    duration: "2h 56m",
                    synopsis: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
                    poster: "q1gd0a4nwhm68va.jpeg",
                    rating: "PG-13"
                },
                {
                    id: 3,
                    title: "Dune",
                    genre: "Adventure, Sci-Fi",
                    duration: "2h 35m",
                    synopsis: "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
                    poster: "the-crow-1_34.jpeg",
                    rating: "PG-13"
                },
                {
                    id: 4,
                    title: "No Time to Die",
                    genre: "Action, Adventure, Thriller",
                    duration: "2h 43m",
                    synopsis: "James Bond has left active service. His peace is short-lived when Felix Leiter, an old friend from the CIA, turns up asking for help, leading Bond onto the trail of a mysterious villain armed with dangerous new technology.",
                    poster: "rekomendasi-film-komedi-indonesia-1.jpg",
                    rating: "PG-13"
                }
            ],
            comingSoon: [
                {
                    id: 5,
                    title: "Black Panther: Wakanda Forever",
                    genre: "Action, Adventure, Drama",
                    duration: "2h 41m",
                    synopsis: "The people of Wakanda fight to protect their home from intervening world powers as they mourn the death of King T'Challa.",
                    poster: "rekomendasi-film-komedi-indonesia-1.jpg",
                    rating: "PG-13",
                    releaseDate: "November 11, 2023"
                },
                {
                    id: 6,
                    title: "Avatar: The Way of Water",
                    genre: "Action, Adventure, Fantasy",
                    duration: "3h 12m",
                    synopsis: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
                    poster: "https://via.placeholder.com/300x450?text=Avatar+2",
                    rating: "PG-13",
                    releaseDate: "December 16, 2023"
                },
                {
                    id: 7,
                    title: "Jurassic World: Dominion",
                    genre: "Action, Adventure, Sci-Fi",
                    duration: "2h 27m",
                    synopsis: "Four years after the destruction of Isla Nublar, dinosaurs now live and hunt alongside humans all over the world. This fragile balance will reshape the future and determine, once and for all, whether human beings are to remain the apex predators on a planet they now share with history's most fearsome creatures.",
                    poster: "https://via.placeholder.com/300x450?text=Jurassic+World+3",
                    rating: "PG-13",
                    releaseDate: "June 10, 2023"
                },
                {
                    id: 8,
                    title: "The Flash",
                    genre: "Action, Adventure, Fantasy",
                    duration: "2h 24m",
                    synopsis: "Barry Allen travels back in time to prevent his mother's murder, which traps him in an alternate reality without metahuman allies. He must race against time to save the world and return to his own universe.",
                    poster: "https://via.placeholder.com/300x450?text=The+Flash",
                    rating: "PG-13",
                    releaseDate: "November 4, 2023"
                }
            ]
        };

        // Current booking data
        let currentBooking = {
            movie: null,
            cinema: null,
            date: null,
            time: null,
            ticketType: "regular",
            seats: [],
            customerInfo: {
                name: "",
                email: "",
                phone: ""
            },
            paymentMethod: null
        };

        // Ticket prices
        const ticketPrices = {
            regular: 40000,
            premium: 60000,
            vip: 80000
        };

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            // Load movies
            loadMovies();
            
            // Header scroll effect
            window.addEventListener('scroll', handleHeaderScroll);
            
            // Modal close button
            document.querySelector('.close-modal').addEventListener('click', closeModal);
            
            // Step navigation
            document.querySelectorAll('.next-step').forEach(button => {
                button.addEventListener('click', goToNextStep);
            });
            
            document.querySelectorAll('.prev-step').forEach(button => {
                button.addEventListener('click', goToPrevStep);
            });
            
            // Time slot selection
            document.querySelectorAll('.time-slot').forEach(button => {
                button.addEventListener('click', selectTimeSlot);
            });
            
            // Ticket type change
            document.getElementById('ticket-type').addEventListener('change', updateTicketType);
            
            // Confirm payment
            document.getElementById('confirm-payment').addEventListener('click', confirmPayment);
            
            // Generate seats
            generateSeats();
            
            // Set minimum date to today
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('date').setAttribute('min', today);
        });

        // Load movies into the page
        function loadMovies() {
            const nowShowingContainer = document.getElementById('nowShowingMovies');
            const comingSoonContainer = document.getElementById('comingSoonMovies');
            
            // Now Showing movies
            movies.nowShowing.forEach(movie => {
                const movieCard = createMovieCard(movie);
                movieCard.addEventListener('click', () => openBookingModal(movie));
                nowShowingContainer.appendChild(movieCard);
            });
            
            // Coming Soon movies
            movies.comingSoon.forEach(movie => {
                const movieCard = createMovieCard(movie, true);
                comingSoonContainer.appendChild(movieCard);
            });
        }

        // Create a movie card element
        function createMovieCard(movie, isComingSoon = false) {
            const card = document.createElement('div');
            card.className = 'movie-card';
            
            card.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
                <div class="movie-info">
                    <h3 class="movie-title">${movie.title}</h3>
                    <div class="movie-meta">
                        <span>${movie.rating}</span>
                        <span>${movie.duration}</span>
                    </div>
                    ${isComingSoon ? `<p>Coming: ${movie.releaseDate}</p>` : '<button class="btn">Book Now</button>'}
                </div>
            `;
            
            return card;
        }

        // Handle header scroll effect
        function handleHeaderScroll() {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Open booking modal with movie details
        function openBookingModal(movie) {
            currentBooking.movie = movie;
            
            const modal = document.getElementById('bookingModal');
            document.getElementById('modalMovieTitle').textContent = movie.title;
            document.getElementById('modalMovieGenre').textContent = movie.genre;
            document.getElementById('modalMovieDuration').textContent = movie.duration;
            document.getElementById('modalMovieSynopsis').textContent = movie.synopsis;
            document.getElementById('modalMoviePoster').src = movie.poster;
            
            // Update summary
            document.getElementById('summary-movie').textContent = movie.title;
            document.getElementById('summary-movie-final').textContent = movie.title;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        // Close booking modal
        function closeModal() {
            const modal = document.getElementById('bookingModal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Reset to step 1
            goToStep(1);
            
            // Reset booking data (except movie)
            currentBooking.cinema = null;
            currentBooking.date = null;
            currentBooking.time = null;
            currentBooking.ticketType = "regular";
            currentBooking.seats = [];
            currentBooking.customerInfo = {
                name: "",
                email: "",
                phone: ""
            };
            currentBooking.paymentMethod = null;
            
            // Reset form
            document.getElementById('cinema').value = "";
            document.getElementById('date').value = "";
            document.getElementById('ticket-type').value = "regular";
            document.getElementById('name').value = "";
            document.getElementById('email').value = "";
            document.getElementById('phone').value = "";
            document.getElementById('payment-method').value = "";
            
            // Reset selected seats
            document.querySelectorAll('.seat.selected').forEach(seat => {
                seat.classList.remove('selected');
                seat.classList.add('available');
            });
            
            // Update summary
            updateSummary();
        }

        // Navigate to a specific step
        function goToStep(stepNumber) {
            // Hide all steps
            document.querySelectorAll('.booking-form').forEach(step => {
                step.classList.remove('active');
            });
            
            // Show the selected step
            document.getElementById(`step${stepNumber}`).classList.add('active');
            
            // Update step indicators
            document.querySelectorAll('.step').forEach(step => {
                step.classList.remove('active');
                if (parseInt(step.dataset.step) === stepNumber) {
                    step.classList.add('active');
                }
            });
        }

        // Go to next step
        function goToNextStep(event) {
            const currentStep = parseInt(document.querySelector('.booking-form.active').id.replace('step', ''));
            const nextStep = parseInt(event.target.dataset.next);
            
            // Validate current step before proceeding
            if (currentStep === 1) {
                if (!currentBooking.cinema || !currentBooking.date || !currentBooking.time) {
                    alert('Please select cinema, date and time');
                    return;
                }
            } else if (currentStep === 2) {
                if (currentBooking.seats.length === 0) {
                    alert('Please select at least one seat');
                    return;
                }
            }
            
            goToStep(nextStep);
        }

        // Go to previous step
        function goToPrevStep(event) {
            const prevStep = parseInt(event.target.dataset.prev);
            goToStep(prevStep);
        }

        // Select time slot
        function selectTimeSlot(event) {
            // Remove active class from all time slots
            document.querySelectorAll('.time-slot').forEach(button => {
                button.classList.remove('active');
            });
            
            // Add active class to selected time slot
            event.target.classList.add('active');
            
            // Update booking data
            currentBooking.time = event.target.textContent;
            
            // Update summary
            document.getElementById('summary-time').textContent = `${formatDate(currentBooking.date)} - ${currentBooking.time}`;
            document.getElementById('summary-time-final').textContent = `${formatDate(currentBooking.date)} - ${currentBooking.time}`;
            
            updateSummary();
        }

        // Format date for display
        function formatDate(dateString) {
            if (!dateString) return "-";
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('en-US', options);
        }

        // Generate cinema seats
        function generateSeats() {
            const seatsGrid = document.getElementById('seatsGrid');
            seatsGrid.innerHTML = '';
            
            // Create row labels (A-J)
            for (let row = 0; row < 10; row++) {
                const rowLabel = document.createElement('div');
                rowLabel.className = 'seat legend';
                rowLabel.textContent = String.fromCharCode(65 + row);
                seatsGrid.appendChild(rowLabel);
                
                // Create seats 1-10 for each row
                for (let seatNum = 1; seatNum <= 10; seatNum++) {
                    const seat = document.createElement('div');
                    seat.className = 'seat available';
                    seat.dataset.row = String.fromCharCode(65 + row);
                    seat.dataset.number = seatNum;
                    seat.textContent = seatNum;
                    
                    // Randomly occupy some seats for demo purposes
                    if (Math.random() < 0.3) {
                        seat.classList.remove('available');
                        seat.classList.add('occupied');
                    }
                    
                    seat.addEventListener('click', toggleSeatSelection);
                    seatsGrid.appendChild(seat);
                }
            }
        }

        // Toggle seat selection
        function toggleSeatSelection(event) {
            const seat = event.target;
            
            // Don't allow selection of occupied seats
            if (seat.classList.contains('occupied')) return;
            
            // Toggle selection
            if (seat.classList.contains('selected')) {
                seat.classList.remove('selected');
                seat.classList.add('available');
                
                // Remove from booking data
                const seatIndex = currentBooking.seats.findIndex(s => 
                    s.row === seat.dataset.row && s.number === parseInt(seat.dataset.number)
                );
                if (seatIndex !== -1) {
                    currentBooking.seats.splice(seatIndex, 1);
                }
            } else {
                seat.classList.remove('available');
                seat.classList.add('selected');
                
                // Add to booking data
                currentBooking.seats.push({
                    row: seat.dataset.row,
                    number: parseInt(seat.dataset.number)
                });
            }
            
            // Update summary
            updateSummary();
        }

        // Update ticket type
        function updateTicketType(event) {
            currentBooking.ticketType = event.target.value;
            updateSummary();
        }

        // Update booking summary
        function updateSummary() {
            // Cinema
            const cinemaSelect = document.getElementById('cinema');
            if (cinemaSelect.value) {
                currentBooking.cinema = cinemaSelect.options[cinemaSelect.selectedIndex].text;
                document.getElementById('summary-cinema').textContent = currentBooking.cinema;
                document.getElementById('summary-cinema-final').textContent = currentBooking.cinema;
            }
            
            // Date
            const dateInput = document.getElementById('date');
            if (dateInput.value) {
                currentBooking.date = dateInput.value;
            }
            
            // Seats
            if (currentBooking.seats.length > 0) {
                const seatsText = currentBooking.seats.map(seat => `${seat.row}${seat.number}`).join(', ');
                document.getElementById('summary-seats').textContent = seatsText;
                document.getElementById('summary-seats-final').textContent = seatsText;
            } else {
                document.getElementById('summary-seats').textContent = '-';
                document.getElementById('summary-seats-final').textContent = '-';
            }
            
            // Ticket type
            document.getElementById('summary-ticket-type').textContent = 
                document.getElementById('ticket-type').options[document.getElementById('ticket-type').selectedIndex].text.split(' -')[0];
            
            document.getElementById('summary-ticket-type-final').textContent = 
                `${document.getElementById('ticket-type').options[document.getElementById('ticket-type').selectedIndex].text.split(' -')[0]} (x${currentBooking.seats.length})`;
            
            // Calculate and display total
            const total = currentBooking.seats.length * ticketPrices[currentBooking.ticketType];
            document.getElementById('summary-total').textContent = `Rp ${total.toLocaleString()}`;
            document.getElementById('summary-total-final').textContent = `Rp ${total.toLocaleString()}`;
        }

        // Confirm payment and complete booking
        function confirmPayment() {
            // Validate form
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const paymentMethod = document.getElementById('payment-method').value;
            
            if (!name || !email || !phone || !paymentMethod) {
                alert('Please fill in all fields');
                return;
            }
            
            // Update booking data
            currentBooking.customerInfo = { name, email, phone };
            currentBooking.paymentMethod = paymentMethod;
            
            // In a real app, you would send this data to a server
            console.log('Booking completed:', currentBooking);
            
            // Show confirmation
            alert(`Thank you for your booking, ${name}! Your tickets for ${currentBooking.movie.title} have been reserved. A confirmation has been sent to ${email}.`);
            
            // Close modal
            closeModal();
        }

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('bookingModal');
            if (event.target === modal) {
                closeModal();
            }
        });